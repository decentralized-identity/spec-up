import path from 'node:path';
import { rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDirectory = path.resolve(__dirname, '..');
const outputDirectory = path.join(rootDirectory, 'assets', 'compiled');

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
    rm(path.join(resolvedOutputDirectory, 'katex.js'), { force: true }),
    rm(path.join(resolvedOutputDirectory, 'katex.css'), { force: true })
  ]);

  await build(createBundleConfig({
    assetsInlineLimit: undefined,
    emptyOutDir: false,
    entry: path.join(resolvedRoot, 'src', 'vite', 'head.js'),
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
    entry: path.join(resolvedRoot, 'src', 'vite', 'katex.js'),
    globalName: 'SpecUpKatex',
    minify,
    reportCompressedSize,
    scriptName: 'katex'
  }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await buildCompiledAssets();
}
