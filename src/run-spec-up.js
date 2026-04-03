'use strict';

const path = require('node:path');
const fsp = require('node:fs/promises');
const { buildAssetTags } = require('./assets');
const { createBuiltinPlugins } = require('./builtin-plugins');
const { createMarkdownInstance } = require('./create-markdown-instance');
const { createPluginManager } = require('./plugin-manager');
const { buildPageHtml } = require('./template');
const { normalizeSpec, readJson } = require('./utils');
const { watchSpec } = require('./watch');

function createPluginEntries(config, options, spec) {
  return [
    ...createBuiltinPlugins(),
    ...(config.plugins || []),
    ...(spec.plugins || []),
    ...(options.plugins || [])
  ];
}

function createRenderState() {
  return {
    externalReferencesHtml: '',
    toc: '',
    tocMeta: {
      count: 0,
      levelCounts: {
        2: 0,
        3: 0,
        4: 0
      }
    }
  };
}

async function renderSpec(context) {
  const {
    config,
    logger,
    options,
    packageRoot,
    pluginManager,
    projectRoot,
    spec
  } = context;
  const plugins = pluginManager.loadPlugins();
  const state = createRenderState();
  const hookContext = {
    config,
    logger,
    options,
    packageRoot,
    projectRoot,
    spec,
    state
  };

  logger.log(`Rendering: ${spec.title}`);

  await pluginManager.runHook(plugins, 'beforeRender', hookContext);

  const markdownFiles = await Promise.all(spec.markdownPaths.map(relativePath => {
    return fsp.readFile(path.join(spec.specDirectory, relativePath), 'utf8');
  }));
  const md = await createMarkdownInstance({
    context: hookContext,
    pluginManager,
    plugins
  });
  const assetTags = await pluginManager.transform(
    plugins,
    'extendAssetTags',
    'assetTags',
    await buildAssetTags({
      options,
      packageRoot,
      spec
    }),
    hookContext
  );
  const markdown = await pluginManager.transform(
    plugins,
    'transformMarkdown',
    'markdown',
    markdownFiles.join('\n'),
    hookContext
  );
  const articleHtml = await pluginManager.transform(
    plugins,
    'transformRenderedHtml',
    'html',
    md.render(markdown),
    {
      ...hookContext,
      markdown,
      md
    }
  );

  await pluginManager.runHook(plugins, 'afterRender', {
    ...hookContext,
    html: articleHtml,
    markdown,
    md
  });

  let pageHtml = buildPageHtml({
    articleHtml,
    assetTags,
    externalReferencesHtml: state.externalReferencesHtml,
    spec,
    tocHtml: state.toc,
    tocMeta: state.tocMeta
  });

  pageHtml = await pluginManager.transform(
    plugins,
    'transformPageHtml',
    'html',
    pageHtml,
    {
      ...hookContext,
      articleHtml,
      assetTags,
      markdown,
      md
    }
  );

  await fsp.mkdir(spec.destination, { recursive: true });

  const outputPath = path.join(spec.destination, 'index.html');
  await fsp.writeFile(outputPath, pageHtml);

  await pluginManager.runHook(plugins, 'afterWrite', {
    ...hookContext,
    assetTags,
    html: pageHtml,
    outputPath
  });

  return outputPath;
}

function loadSpecContexts(options = {}) {
  const logger = options.logger || console;
  const packageRoot = path.resolve(__dirname, '..');
  const projectRoot = path.resolve(options.cwd || process.cwd());
  const configPath = path.resolve(options.configPath || path.join(projectRoot, 'specs.json'));
  const config = readJson(configPath);
  const specs = (config.specs || []).map(specConfig => normalizeSpec(specConfig, projectRoot));
  const specContexts = specs.map(spec => {
    const pluginEntries = createPluginEntries(config, options, spec);
    const pluginManager = createPluginManager(pluginEntries, projectRoot);

    return {
      config,
      logger,
      options,
      packageRoot,
      pluginManager,
      projectRoot,
      spec
    };
  });

  return {
    config,
    configPath,
    logger,
    packageRoot,
    projectRoot,
    specContexts
  };
}

async function runSpecUp(options = {}) {
  const {
    configPath,
    projectRoot,
    specContexts
  } = loadSpecContexts(options);
  const watchers = [];

  for (const renderContext of specContexts) {
    await renderSpec(renderContext);

    if (!renderContext.options.nowatch) {
      watchers.push(watchSpec({
        logger: renderContext.logger,
        pluginWatchPaths: renderContext.pluginManager.getWatchPaths(),
        projectRoot: renderContext.projectRoot,
        renderFn() {
          return renderSpec(renderContext);
        },
        spec: renderContext.spec
      }));
    }
  }

  return {
    configPath,
    projectRoot,
    watchers
  };
}

module.exports = {
  loadSpecContexts,
  renderSpec,
  runSpecUp
};
