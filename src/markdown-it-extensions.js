const levels = 2;
const openString = '['.repeat(levels);
const closeString = ']'.repeat(levels);
const contentRegex = /\s*([^\s\[\]:]+):?\s*([^\]\n]+)?/i;
const replacerArgsRegex = /\s*,+\s*/;

export default function markdownItExtensions(md, templates = []) {
  md.inline.ruler.after('emphasis', 'templates', function templatesRule(state) {
    const start = state.pos;
    const prefix = state.src.slice(start, start + levels);

    if (prefix !== openString) {
      return false;
    }

    const indexOfClosingBrace = state.src.indexOf(closeString, start + levels);

    if (indexOfClosingBrace < 0) {
      return false;
    }

    const match = contentRegex.exec(state.src.slice(start + levels, indexOfClosingBrace));

    if (!match) {
      return false;
    }

    const type = match[1];
    const template = templates.find(candidate => candidate.filter(type));

    if (!template) {
      return false;
    }

    const args = match[2] ? match[2].trim().split(replacerArgsRegex) : [];
    const token = state.push('template', '', 0);

    token.content = match[0];
    token.info = { args, template, type };

    if (typeof template.parse === 'function') {
      token.content = template.parse(token, type, ...args) || token.content;
    }

    state.pos = indexOfClosingBrace + levels;
    return true;
  });

  md.renderer.rules.template = function renderTemplate(tokens, idx) {
    const token = tokens[idx];
    const template = token.info.template;

    if (typeof template.render === 'function') {
      return template.render(token, token.info.type, ...token.info.args) || `${openString}${token.content}${closeString}`;
    }

    return token.content;
  };

  const pathSegmentRegex = /(?:http[s]*:\/\/([^\/]*)|(?:\/([^\/?]*)))/g;

  md.renderer.rules.link_open = function renderLinkOpen(tokens, idx) {
    const token = tokens[idx];
    const attributes = (token.attrs || []).reduce((html, [name, value]) => {
      let next = html;

      if (name === 'href') {
        let index = 0;

        String(value).replace(pathSegmentRegex, (match, domain, segment) => {
          next += `path-${index++}="${domain || segment}" `;
          return match;
        });
      }

      return `${next}${name}="${value}" `;
    }, '');

    const anchor = `<a ${attributes}>`;
    return token.markup === 'linkify' ? `${anchor}<span>` : anchor;
  };

  md.renderer.rules.link_close = function renderLinkClose(tokens, idx) {
    return tokens[idx].markup === 'linkify' ? '</span></a>' : '</a>';
  };
}
