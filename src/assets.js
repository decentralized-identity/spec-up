import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

const COMPILED_ASSET_DIRECTORY = path.join('assets', 'compiled');
const COMPILED_BODY_PATH = path.join(COMPILED_ASSET_DIRECTORY, 'body.js');
const COMPILED_HEAD_CSS_PATH = path.join(COMPILED_ASSET_DIRECTORY, 'head.css');
const COMPILED_HEAD_PATH = path.join(COMPILED_ASSET_DIRECTORY, 'head.js');
const COMPILED_ICON_LIBRARY_DIRECTORY = path.join(COMPILED_ASSET_DIRECTORY, 'icon-library');
const COMPILED_THEME_PATH = path.join(COMPILED_ASSET_DIRECTORY, 'theme.js');

function buildInlineScriptTag(scriptContents) {
  return `<script>${String(scriptContents).replace(/<\/script/gi, '<\\/script')}</script>`;
}

function readScriptContents(packageRoot, relativePath) {
  return fs.readFileSync(path.resolve(packageRoot, relativePath), 'utf8').trim();
}

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

function buildViteDevTags(packageRoot, devServerUrl) {
  const normalizedUrl = String(devServerUrl).replace(/\/+$/, '');
  const themeScript = buildInlineScriptTag(readScriptContents(packageRoot, path.join('src', 'vite', 'theme.js')));

  return {
    body: `<script type="module" src="${normalizedUrl}/src/vite/body.js"></script>`,
    head: `${themeScript}<script type="module" src="${normalizedUrl}/@vite/client"></script><script type="module" src="${normalizedUrl}/src/vite/head.js"></script>`
  };
}

function buildCompiledTags(packageRoot) {
  const themeScript = buildInlineScriptTag(readScriptContents(packageRoot, COMPILED_THEME_PATH));

  return {
    body: `<script src="${COMPILED_BODY_PATH}"></script>`,
    head: `${themeScript}<link href="${COMPILED_HEAD_CSS_PATH}" rel="stylesheet"/><script src="${COMPILED_HEAD_PATH}"></script>`
  };
}

async function ensureCompiledAssetsForSpec(packageRoot, spec) {
  const compiledFiles = [
    COMPILED_BODY_PATH,
    COMPILED_HEAD_CSS_PATH,
    COMPILED_HEAD_PATH
  ];
  const compiledDirectories = [
    COMPILED_ICON_LIBRARY_DIRECTORY
  ];

  await Promise.all(compiledFiles.map(async relativePath => {
    const sourcePath = path.resolve(packageRoot, relativePath);
    const destinationPath = path.resolve(spec.destination, relativePath);

    if (sourcePath === destinationPath) {
      return;
    }

    await fsp.mkdir(path.dirname(destinationPath), { recursive: true });
    await fsp.copyFile(sourcePath, destinationPath);
  }));

  await Promise.all(compiledDirectories.map(async relativePath => {
    const sourcePath = path.resolve(packageRoot, relativePath);
    const destinationPath = path.resolve(spec.destination, relativePath);

    if (sourcePath === destinationPath) {
      return;
    }

    await fsp.mkdir(path.dirname(destinationPath), { recursive: true });
    await fsp.cp(sourcePath, destinationPath, { force: true, recursive: true });
  }));
}

async function buildAssetTags({ options, packageRoot, spec }) {
  const customAssets = buildCustomAssetTags(spec);
  let baseTags;

  if (options.devServerUrl) {
    baseTags = buildViteDevTags(packageRoot, options.devServerUrl);
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

export {
  buildAssetTags
};
