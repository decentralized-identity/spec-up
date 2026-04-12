import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { defineConfig } from 'vite';
import { createSpecUpBuildPlugin, createSpecUpVitePlugin } from './src/vite/spec-up-vite-plugin.mjs';

const require = createRequire(import.meta.url);
const { loadSpecContexts } = require('./src/run-spec-up');

function toWatchPattern(rootDirectory, targetPath, suffix = '') {
  const relativePath = path.relative(rootDirectory, targetPath).split(path.sep).join('/');

  if (!relativePath) {
    return suffix.replace(/^\/+/, '');
  }

  return `${relativePath}${suffix}`;
}

function createBuildWatchExclude(rootDirectory = process.cwd()) {
  const excludes = ['.vite/**', 'assets/compiled/**'];

  try {
    const { specContexts } = loadSpecContexts({
      cwd: rootDirectory,
      logger: {
        error() {},
        log() {},
        warn() {}
      }
    });

    for (const { spec } of specContexts) {
      excludes.push(toWatchPattern(rootDirectory, path.join(spec.destination, 'index.html')));
      excludes.push(toWatchPattern(rootDirectory, path.join(spec.destination, 'fonts'), '/**'));
    }
  }
  catch {
    // Ignore missing/invalid spec config so Vite can still start far enough to report it elsewhere.
  }

  return excludes;
}

function createServerConfig(rootDirectory = process.cwd()) {
  const host = process.env.SPEC_UP_DEV_HOST || '127.0.0.1';
  const port = Number.parseInt(process.env.SPEC_UP_DEV_PORT || '5173', 10);
  const config = {
    host,
    port: Number.isFinite(port) ? port : 5173,
    strictPort: true
  };

  if (process.env.SPEC_UP_DEV_HTTPS !== '1') {
    return config;
  }

  const tlsDirectory = path.resolve(rootDirectory, '.local-dev', 'tls');
  const certPath = path.resolve(
    rootDirectory,
    process.env.SPEC_UP_DEV_TLS_CERT || path.join(tlsDirectory, `${host}.crt`)
  );
  const keyPath = path.resolve(
    rootDirectory,
    process.env.SPEC_UP_DEV_TLS_KEY || path.join(tlsDirectory, `${host}.key`)
  );

  config.https = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
  };

  return config;
}

export default defineConfig(() => {
  const isWatchBuild = process.argv.includes('--watch');
  const rootDirectory = process.cwd();

  return {
    appType: 'mpa',
    server: createServerConfig(rootDirectory),
    build: {
      chunkSizeWarningLimit: 1500,
      emptyOutDir: true,
      outDir: '.vite/spec-up-build',
      reportCompressedSize: false,
      watch: isWatchBuild ? {
        exclude: createBuildWatchExclude()
      } : null,
      rollupOptions: {
        input: {
          host: path.resolve('src/vite/build-host.js')
        },
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: '[name].js'
        }
      }
    },
    plugins: [
      createSpecUpVitePlugin(),
      createSpecUpBuildPlugin()
    ]
  };
});
