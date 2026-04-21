import path from 'node:path';
import { createRequire } from 'node:module';
import { buildCompiledAssets } from '../../scripts/build-assets.mjs';

const require = createRequire(import.meta.url);
const { loadSpecContexts, renderSpec } = require('../run-spec-up');
const { createRenderScheduler, customAssetWatchPaths } = require('../watch');
const { relativeTo, unique } = require('../utils');

function isWithinDirectory(filePath, directoryPath) {
  const relativePath = path.relative(directoryPath, filePath);
  return relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));
}

function normalizeChangedPath(rootDirectory, changedPath) {
  return path.isAbsolute(changedPath) ? changedPath : path.resolve(rootDirectory, changedPath);
}

function normalizeDevServerHost(host) {
  if (!host || host === true || host === '0.0.0.0' || host === '::') {
    return '127.0.0.1';
  }

  return host;
}

function createDevServerUrl(serverConfig) {
  const protocol = serverConfig.https ? 'https' : 'http';
  const host = normalizeDevServerHost(serverConfig.host);
  const port = serverConfig.port || 5173;

  return `${protocol}://${host}:${port}`;
}

function needsCompiledAssetBuild(changedPaths, rootDirectory) {
  const compiledAssetDirectories = [
    path.join(rootDirectory, 'assets', 'css'),
    path.join(rootDirectory, 'assets', 'js'),
    path.join(rootDirectory, 'src', 'vite'),
    path.join(rootDirectory, 'src', 'web-awesome', 'dist')
  ];
  const compiledAssetFiles = new Set([
    path.join(rootDirectory, 'assets', 'icons.svg')
  ]);

  if (!changedPaths.size) {
    return true;
  }

  for (const changedPath of changedPaths) {
    if (compiledAssetFiles.has(changedPath)) {
      return true;
    }

    if (compiledAssetDirectories.some(directoryPath => isWithinDirectory(changedPath, directoryPath))) {
      return true;
    }
  }

  return false;
}

function createViteLogger(viteLogger) {
  return {
    error(value) {
      viteLogger.error(`[spec-up] ${value?.stack || value?.message || String(value)}`);
    },
    log(message) {
      viteLogger.info(`[spec-up] ${message}`);
    },
    warn(message) {
      viteLogger.warn(`[spec-up] ${message}`);
    }
  };
}

function collectWatchState(loadedContexts, tempOutDirectory) {
  const watchFiles = [];
  const watchDirectories = [];
  const ignoredFiles = [];
  const ignoredDirectories = [tempOutDirectory];

  watchFiles.push(loadedContexts.configPath);
  watchFiles.push(path.join(loadedContexts.packageRoot, 'assets', 'compiled', 'refs.json'));

  for (const context of loadedContexts.specContexts) {
    watchDirectories.push(context.spec.specDirectory);
    watchFiles.push(...context.spec.markdownPaths.map(relativePath => {
      return path.join(context.spec.specDirectory, relativePath);
    }));
    watchFiles.push(...customAssetWatchPaths(context.projectRoot, context.spec));
    watchFiles.push(...context.pluginManager.getWatchPaths());
    ignoredFiles.push(path.join(context.spec.destination, 'index.html'));
    ignoredDirectories.push(path.join(context.spec.destination, 'assets', 'compiled'));
    ignoredDirectories.push(path.join(context.spec.destination, 'fonts'));
  }

  return {
    ignoredDirectories: unique(ignoredDirectories),
    ignoredFiles: new Set(unique(ignoredFiles)),
    watchDirectories: unique(watchDirectories),
    watchPaths: unique([...watchDirectories, ...watchFiles]),
    watchFiles: new Set(unique(watchFiles))
  };
}

function shouldHandleChange(changedPath, watchState) {
  if (watchState.ignoredFiles.has(changedPath)) {
    return false;
  }

  if (watchState.ignoredDirectories.some(directoryPath => isWithinDirectory(changedPath, directoryPath))) {
    return false;
  }

  if (watchState.watchFiles.has(changedPath)) {
    return true;
  }

  return watchState.watchDirectories.some(directoryPath => isWithinDirectory(changedPath, directoryPath));
}

async function renderProject({ devMode, logger, rootDirectory, viteLogger }) {
  const devServerUrl = devMode && logger.devServerUrl ? logger.devServerUrl : undefined;
  const loadedContexts = loadSpecContexts({
    cwd: rootDirectory,
    devServerUrl,
    logger
  });

  for (const renderContext of loadedContexts.specContexts) {
    await renderSpec(renderContext);
  }

  viteLogger.info(`[spec-up] Rendered ${loadedContexts.specContexts.length} spec${loadedContexts.specContexts.length === 1 ? '' : 's'}.`);

  return loadedContexts;
}

export function createSpecUpVitePlugin() {
  let rootDirectory = process.cwd();
  let tempOutDirectory = path.join(rootDirectory, '.vite', 'spec-up-build');
  let viteLogger = console;
  let watchState = null;

  async function refreshWatchState(server) {
    const loadedContexts = loadSpecContexts({
      cwd: rootDirectory,
      devServerUrl: '/',
      logger: createViteLogger(viteLogger)
    });

    watchState = collectWatchState(loadedContexts, tempOutDirectory);
    server.watcher.add(watchState.watchPaths);
  }

  return {
    apply: 'serve',
    configResolved(resolvedConfig) {
      rootDirectory = resolvedConfig.root;
      tempOutDirectory = path.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
      viteLogger = resolvedConfig.logger;
    },
    configureServer(server) {
      const logger = createViteLogger(viteLogger);
      logger.devServerUrl = createDevServerUrl(server.config.server);
      let ready = false;
      const initialRender = (async () => {
        await renderProject({
          devMode: true,
          logger,
          rootDirectory,
          viteLogger
        });
        await refreshWatchState(server);
      })();
      const scheduleRender = createRenderScheduler(async () => {
        await renderProject({
          devMode: true,
          logger,
          rootDirectory,
          viteLogger
        });
        await refreshWatchState(server);
        server.ws.send({ type: 'full-reload' });
      });

      server.middlewares.use(async (_req, _res, next) => {
        if (!ready) {
          ready = true;

          try {
            await initialRender;
          }
          catch (error) {
            logger.error(error);
          }
        }

        next();
      });

      server.watcher.on('all', async (eventName, changedPath) => {
        if (!watchState) {
          return;
        }

        const normalizedPath = normalizeChangedPath(rootDirectory, changedPath);

        if (!shouldHandleChange(normalizedPath, watchState)) {
          return;
        }

        viteLogger.info(`[spec-up] Change detected (${eventName}): ${relativeTo(rootDirectory, normalizedPath)}`);

        try {
          await scheduleRender();
        }
        catch (error) {
          logger.error(error);
        }
      });
    }
  };
}

export function createSpecUpBuildPlugin() {
  let changedPaths = new Set();
  let hasCompletedInitialBuild = false;
  let isWatchBuild = process.argv.includes('--watch');
  let rootDirectory = process.cwd();
  let tempOutDirectory = path.join(rootDirectory, '.vite', 'spec-up-build');
  let viteLogger = console;

  return {
    apply: 'build',
    async buildStart() {
      const loadedContexts = loadSpecContexts({
        cwd: rootDirectory,
        logger: createViteLogger(viteLogger)
      });
      const watchState = collectWatchState(loadedContexts, tempOutDirectory);

      // Rollup directory watches will also react to generated output written back
      // into spec destinations, so build mode only watches explicit source files.
      for (const watchPath of watchState.watchFiles) {
        this.addWatchFile(watchPath);
      }
    },
    async closeBundle() {
      const logger = createViteLogger(viteLogger);
      const shouldBuildCompiledAssets = !hasCompletedInitialBuild || needsCompiledAssetBuild(changedPaths, rootDirectory);

      if (shouldBuildCompiledAssets) {
        await buildCompiledAssets({
          minify: !isWatchBuild,
          reportCompressedSize: !isWatchBuild,
          root: rootDirectory
        });
      }

      await renderProject({
        devMode: false,
        logger,
        rootDirectory,
        viteLogger
      });

      changedPaths = new Set();
      hasCompletedInitialBuild = true;
    },
    configResolved(resolvedConfig) {
      isWatchBuild = Boolean(resolvedConfig.build.watch);
      rootDirectory = resolvedConfig.root;
      tempOutDirectory = path.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
      viteLogger = resolvedConfig.logger;
    },
    watchChange(id) {
      changedPaths.add(normalizeChangedPath(rootDirectory, id));
    }
  };
}
