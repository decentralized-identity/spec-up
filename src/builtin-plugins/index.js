'use strict';

const createCoreMarkdownPlugin = require('./core-markdown');
const createInsertPlugin = require('./insert');
const createKatexPlugin = require('./katex');
const createSpecReferencesPlugin = require('./spec-references');
const createTerminologyPlugin = require('./terminology');

function createBuiltinPlugins() {
  return [
    createInsertPlugin,
    createTerminologyPlugin,
    createSpecReferencesPlugin,
    createCoreMarkdownPlugin,
    createKatexPlugin
  ];
}

module.exports = {
  createBuiltinPlugins
};
