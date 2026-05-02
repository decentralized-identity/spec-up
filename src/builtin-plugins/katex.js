import fsp from 'node:fs/promises';
import path from 'node:path';
import katex from 'katex';
import markdownItKatexModule from '@vscode/markdown-it-katex';
import { unwrapDefault } from '../utils.js';

const KATEX_OUTPUT_PATH = 'assets/compiled/katex.css';
const KATEX_FONTS_OUTPUT_PATH = 'assets/compiled/fonts';

function buildKatexAssetTag({ devServerUrl }) {
  if (devServerUrl) {
    const normalizedUrl = String(devServerUrl).replace(/\/+$/, '');

    return `<script type="module" src="${normalizedUrl}/src/vite/katex.js"></script>`;
  }

  return `<link href="${KATEX_OUTPUT_PATH}" rel="stylesheet"/>`;
}

function createKatexPlugin() {
  const markdownItKatex = unwrapDefault(markdownItKatexModule);

  return {
    name: 'katex',
    async afterWrite({ packageRoot, spec }) {
      if (!spec.katex) {
        return;
      }

      const sourcePath = path.join(packageRoot, KATEX_OUTPUT_PATH);
      const destinationPath = path.join(spec.destination, KATEX_OUTPUT_PATH);
      const sourceFontsPath = path.join(packageRoot, KATEX_FONTS_OUTPUT_PATH);
      const destinationFontsPath = path.join(spec.destination, KATEX_FONTS_OUTPUT_PATH);

      if (sourcePath === destinationPath) {
        return;
      }

      await fsp.mkdir(path.dirname(destinationPath), { recursive: true });
      await fsp.copyFile(sourcePath, destinationPath);
      await fsp.mkdir(path.dirname(destinationFontsPath), { recursive: true });
      await fsp.cp(sourceFontsPath, destinationFontsPath, { recursive: true });
    },
    configureMarkdownIt({ md, spec }) {
      if (!spec.katex) {
        return;
      }

      md.use(markdownItKatex, { katex });
    },
    extendAssetTags({ assetTags, options, packageRoot, spec }) {
      if (!spec.katex) {
        return assetTags;
      }

      return {
        ...assetTags,
        head: `${assetTags.head}${buildKatexAssetTag({
          devServerUrl: options.devServerUrl
        })}`
      };
    }
  };
}

export default createKatexPlugin;
