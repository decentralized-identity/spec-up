import fs from 'node:fs';
import path from 'node:path';

const replacerRegex = /\[\[\s*([^\s\[\]:]+):?\s*([^\]\n]+)?\]\]/gim;
const replacerArgsRegex = /\s*,+\s*/;

function createInsertPlugin() {
  return {
    name: 'insert',
    transformMarkdown({ markdown, projectRoot }) {
      return markdown.replace(replacerRegex, (match, type, args) => {
        if (String(type).trim() !== 'insert') {
          return match;
        }

        const [requestedPath] = String(args || '').trim().split(replacerArgsRegex);

        if (!requestedPath) {
          return '';
        }

        const absolutePath = path.resolve(projectRoot, requestedPath);
        return fs.readFileSync(absolutePath, 'utf8');
      });
    }
  };
}

export default createInsertPlugin;
