import MarkdownIt from 'markdown-it';
import markdownItExtensions from './markdown-it-extensions.js';

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

export {
  createMarkdownInstance
};
