'use strict';

const levels = 2;
const openString = '['.repeat(levels);
const closeString = ']'.repeat(levels);
const contentRegex = /\s*([^\s\[\]:]+):?\s*([^\]\n]+)?/i;

module.exports = function(md, templates = {}) {

   md.inline.ruler.after('emphasis', 'templates', function templates_ruler(state, silent) {   

    var start = state.pos;
    let prefix = state.src.slice(start, start + levels);
    if (prefix !== openString) return false;
    var indexOfClosingBrace = state.src.indexOf(closeString, start);

    if (indexOfClosingBrace > 0) {

      let match = contentRegex.exec(state.src.slice(start + levels, indexOfClosingBrace));
      if (!match) return false;

      let type = match[1];
      let template = templates.find(t => t.filter(type) && t);
      if (!template) return false;

      let args = match[2] ? match[2].trim().split(/\s*,\s*/) : [];
      let token = state.push('template', '', 0);
      token.content = match[0];
      token.info = { type, template, args };
      if (template.parse) template.parse(token, type, ...args);

      state.pos = indexOfClosingBrace + levels;
      return true;
    }

    return false;
  });

  md.renderer.rules.template = function(tokens, idx, options, env, renderer) {
    let token = tokens[idx];
    let template = token.info.template;
    let content = template.render && template.render(token, token.info.type, ...token.info.args);
    return content || openString + token.content + closeString;
  }

};