import path from 'node:path';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDirectory = path.resolve(__dirname, '..');
const outputDirectory = path.join(rootDirectory, 'assets', 'compiled');
const ICON_LIBRARY_DIRECTORY_NAME = 'icon-library';
const HEAD_CSS_SOURCES = [
  path.join(rootDirectory, 'assets', 'css', 'prism.css'),
  path.join(rootDirectory, 'src', 'web-awesome', 'dist-cdn', 'styles', 'native.css'),
  path.join(rootDirectory, 'src', 'web-awesome', 'dist-cdn', 'styles', 'utilities.css'),
  path.join(rootDirectory, 'src', 'web-awesome', 'dist-cdn', 'styles', 'themes', 'default.css'),
  path.join(rootDirectory, 'src', 'web-awesome', 'dist-cdn', 'styles', 'color', 'variants', 'brand.css'),
  path.join(rootDirectory, 'assets', 'css', 'index.css')
];
const KATEX_CSS_SOURCE = path.join(rootDirectory, 'node_modules', 'katex', 'dist', 'katex.min.css');
const KATEX_FONTS_SOURCE = path.join(rootDirectory, 'node_modules', 'katex', 'dist', 'fonts');
const SPEC_UP_ICON_SYMBOL_PATTERN = /<symbol id="spec-up-icon-([^"]+)" viewBox="([^"]+)">([\s\S]*?)<\/symbol>/g;
const DEFAULT_ICON_OVERRIDES = Object.freeze({
  solid: new Set(['bars'])
});

function createBundleConfig({
  assetsInlineLimit,
  emptyOutDir,
  entry,
  globalName,
  minify,
  reportCompressedSize,
  scriptName
}) {
  return {
    configFile: false,
    root: rootDirectory,
    build: {
      assetsInlineLimit,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1500,
      emptyOutDir,
      lib: {
        entry,
        fileName: () => `${scriptName}.js`,
        formats: ['iife'],
        name: globalName
      },
      minify,
      outDir: outputDirectory,
      reportCompressedSize,
      rollupOptions: {
        output: {
          assetFileNames(assetInfo) {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return `${scriptName}[extname]`;
            }

            return '[name][extname]';
          },
          inlineDynamicImports: true
        }
      },
      sourcemap: false,
      target: 'es2019'
    }
  };
}

async function writeMergedCss(outputPath, sourcePaths) {
  const sections = await Promise.all(sourcePaths.map(sourcePath => readFile(sourcePath, 'utf8')));

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${sections.join('\n\n')}\n`);
}

function parseSpecUpIcons(iconSource) {
  const icons = new Map();

  for (const match of iconSource.matchAll(SPEC_UP_ICON_SYMBOL_PATTERN)) {
    const [, name, viewBox, content] = match;
    icons.set(name, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${content}</svg>\n`);
  }

  return icons;
}

async function writeIconLibrary(outputDirectory, iconsByVariant) {
  const writeOperations = [];

  for (const [variant, variantIcons] of Object.entries(iconsByVariant)) {
    const variantDirectory = path.join(outputDirectory, variant);

    await mkdir(variantDirectory, { recursive: true });

    for (const [name, svg] of Object.entries(variantIcons)) {
      writeOperations.push(writeFile(path.join(variantDirectory, `${name}.svg`), `${svg.trim()}\n`));
    }
  }

  await Promise.all(writeOperations);
}

async function writeSpecUpIconLibrary(resolvedRoot, resolvedOutputDirectory) {
  const iconSource = await readFile(path.join(resolvedRoot, 'assets', 'icons.svg'), 'utf8');
  const specUpIcons = parseSpecUpIcons(iconSource);
  const outputDirectory = path.join(resolvedOutputDirectory, ICON_LIBRARY_DIRECTORY_NAME, 'spec-up');

  await mkdir(outputDirectory, { recursive: true });

  await Promise.all(
    [...specUpIcons.entries()].map(([name, svg]) => writeFile(path.join(outputDirectory, `${name}.svg`), svg))
  );
}

async function loadSystemIcons(resolvedRoot) {
  const systemIconModuleUrl = new URL(
    `${pathToFileURL(path.join(resolvedRoot, 'src', 'web-awesome', 'dist-cdn', 'chunks', 'chunk.DSSPBSBT.js')).href}?t=${Date.now()}`
  );
  const { icons } = await import(systemIconModuleUrl.href);

  return icons;
}

async function writeDefaultIconLibrary(resolvedRoot, resolvedOutputDirectory) {
  const outputDirectory = path.join(resolvedOutputDirectory, ICON_LIBRARY_DIRECTORY_NAME, 'default');
  const iconSource = await readFile(path.join(resolvedRoot, 'assets', 'icons.svg'), 'utf8');
  const specUpIcons = parseSpecUpIcons(iconSource);
  const systemIcons = await loadSystemIcons(resolvedRoot);
  const defaultIcons = {
    ...systemIcons,
    solid: {
      ...systemIcons.solid
    }
  };

  for (const iconName of DEFAULT_ICON_OVERRIDES.solid) {
    if (specUpIcons.has(iconName)) {
      defaultIcons.solid[iconName] = specUpIcons.get(iconName).trim();
    }
  }

  await writeIconLibrary(outputDirectory, defaultIcons);
}

async function writeSystemIconLibrary(resolvedRoot, resolvedOutputDirectory) {
  const outputDirectory = path.join(resolvedOutputDirectory, ICON_LIBRARY_DIRECTORY_NAME, 'system');
  const systemIcons = await loadSystemIcons(resolvedRoot);

  await writeIconLibrary(outputDirectory, systemIcons);
}

export async function buildCompiledAssets({
  minify = true,
  reportCompressedSize = true,
  root = rootDirectory
} = {}) {
  const resolvedRoot = path.resolve(root);
  const resolvedOutputDirectory = path.join(resolvedRoot, 'assets', 'compiled');

  await Promise.all([
    rm(path.join(resolvedOutputDirectory, 'head.js'), { force: true }),
    rm(path.join(resolvedOutputDirectory, 'head.css'), { force: true }),
    rm(path.join(resolvedOutputDirectory, 'body.js'), { force: true }),
    rm(path.join(resolvedOutputDirectory, 'icons.svg'), { force: true }),
    rm(path.join(resolvedOutputDirectory, 'system-icons.svg'), { force: true }),
    rm(path.join(resolvedOutputDirectory, ICON_LIBRARY_DIRECTORY_NAME), { force: true, recursive: true }),
    rm(path.join(resolvedOutputDirectory, 'theme.js'), { force: true }),
    rm(path.join(resolvedOutputDirectory, 'katex.js'), { force: true }),
    rm(path.join(resolvedOutputDirectory, 'katex.css'), { force: true }),
    rm(path.join(resolvedOutputDirectory, 'fonts'), { force: true, recursive: true })
  ]);

  await writeMergedCss(path.join(resolvedOutputDirectory, 'head.css'), HEAD_CSS_SOURCES);
  await Promise.all([
    writeDefaultIconLibrary(resolvedRoot, resolvedOutputDirectory),
    writeSpecUpIconLibrary(resolvedRoot, resolvedOutputDirectory),
    writeSystemIconLibrary(resolvedRoot, resolvedOutputDirectory)
  ]);

  await build(createBundleConfig({
    assetsInlineLimit: undefined,
    emptyOutDir: false,
    entry: path.join(resolvedRoot, 'src', 'vite', 'head-runtime.js'),
    globalName: 'SpecUpHead',
    minify,
    reportCompressedSize,
    scriptName: 'head'
  }));

  await build(createBundleConfig({
    assetsInlineLimit: undefined,
    emptyOutDir: false,
    entry: path.join(resolvedRoot, 'src', 'vite', 'body.js'),
    globalName: 'SpecUpBody',
    minify,
    reportCompressedSize,
    scriptName: 'body'
  }));

  await build(createBundleConfig({
    assetsInlineLimit: 20 * 1024 * 1024,
    emptyOutDir: false,
    entry: path.join(resolvedRoot, 'src', 'vite', 'theme.js'),
    globalName: 'SpecUpTheme',
    minify,
    reportCompressedSize,
    scriptName: 'theme'
  }));

  await writeFile(
    path.join(resolvedOutputDirectory, 'katex.css'),
    `${await readFile(KATEX_CSS_SOURCE, 'utf8')}\n`
  );
  await cp(KATEX_FONTS_SOURCE, path.join(resolvedOutputDirectory, 'fonts'), { recursive: true });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await buildCompiledAssets();
}
