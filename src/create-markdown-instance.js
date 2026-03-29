'use strict';

const MarkdownIt = require('markdown-it');
const markdownItExtensions = require('./markdown-it-extensions');

async function createMarkdownInstance({ context, pluginManager, plugins }) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  const templates = await pluginManager.collectHook(plugins, 'markdownTemplates', context);

  if (templates.length > 0) {
    md.use(markdownItExtensions, templates);
  }

  await pluginManager.runHook(plugins, 'configureMarkdownIt', {
    ...context,
    md
  });

  return md;
}

module.exports = {
  createMarkdownInstance
};
