import createCoreMarkdownPlugin from './core-markdown.js';
import createInsertPlugin from './insert.js';
import createKatexPlugin from './katex.js';
import createSpecReferencesPlugin from './spec-references.js';
import createTerminologyPlugin from './terminology.js';

function createBuiltinPlugins() {
  return [
    createInsertPlugin,
    createTerminologyPlugin,
    createSpecReferencesPlugin,
    createCoreMarkdownPlugin,
    createKatexPlugin
  ];
}

export {
  createBuiltinPlugins
};
