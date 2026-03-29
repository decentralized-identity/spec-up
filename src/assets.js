'use strict';

const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

const COMPILED_ASSET_DIRECTORY = path.join('assets', 'compiled');
const COMPILED_BODY_PATH = path.join(COMPILED_ASSET_DIRECTORY, 'body.js');
const COMPILED_HEAD_PATH = path.join(COMPILED_ASSET_DIRECTORY, 'head.js');

function buildCustomAssetTags(spec) {
  return (spec.assets || []).reduce((assets, asset) => {
    const extension = String(asset.path || '').split('.').pop();

    if (extension === 'css') {
      assets.css += `<link href="${asset.path}" rel="stylesheet"/>`;
    }

    if (extension === 'js') {
      const bucket = asset.inject || 'body';
      assets.js[bucket] += `<script src="${asset.path}"${asset.module ? ' type="module"' : ''}></script>`;
    }

    return assets;
  }, {
    css: '',
    js: {
      body: '',
      head: ''
    }
  });
}

function buildViteDevTags(devServerUrl) {
  const normalizedUrl = String(devServerUrl).replace(/\/+$/, '');

  return {
    body: `<script type="module" src="${normalizedUrl}/src/vite/body.js"></script>`,
    head: `<script type="module" src="${normalizedUrl}/@vite/client"></script><script type="module" src="${normalizedUrl}/src/vite/head.js"></script>`
  };
}

function buildCompiledTags(packageRoot) {
  return {
    body: `<script src="${COMPILED_BODY_PATH}"></script>`,
    head: `<script src="${COMPILED_HEAD_PATH}"></script>`
  };
}

async function ensureCompiledAssetsForSpec(packageRoot, spec) {
  const compiledFiles = [COMPILED_BODY_PATH, COMPILED_HEAD_PATH];

  await Promise.all(compiledFiles.map(async relativePath => {
    const sourcePath = path.resolve(packageRoot, relativePath);
    const destinationPath = path.resolve(spec.destination, relativePath);

    if (sourcePath === destinationPath) {
      return;
    }

    await fsp.mkdir(path.dirname(destinationPath), { recursive: true });
    await fsp.copyFile(sourcePath, destinationPath);
  }));
}

async function buildAssetTags({ options, packageRoot, spec }) {
  const customAssets = buildCustomAssetTags(spec);
  let baseTags;

  if (options.devServerUrl) {
    baseTags = buildViteDevTags(options.devServerUrl);
  }
  else {
    await ensureCompiledAssetsForSpec(packageRoot, spec);
    baseTags = buildCompiledTags(packageRoot);
  }

  return {
    body: `${baseTags.body}${customAssets.js.body}`,
    head: `${baseTags.head}${customAssets.css}${customAssets.js.head}`,
    svg: fs.readFileSync(path.join(packageRoot, 'assets/icons.svg'), 'utf8')
  };
}

module.exports = {
  buildAssetTags
};
