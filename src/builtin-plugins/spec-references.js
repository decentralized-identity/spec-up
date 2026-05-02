import path from 'node:path';
import { readJson } from '../utils.js';

const specNameRegex = /^spec$|^spec[-]*\w+$/i;

function formatAuthors(reference) {
  if (Array.isArray(reference.authors)) {
    return reference.authors.join('; ');
  }

  if (typeof reference.authors === 'string') {
    return reference.authors;
  }

  return '';
}

function renderReferenceGroup(group) {
  const items = Object.keys(group).sort().map(name => {
    const reference = group[name];
    const authorMarkup = formatAuthors(reference);
    const dateMarkup = reference.rawDate ? `${reference.rawDate}. ` : '';
    const statusMarkup = reference.status ? `<span class="reference-status">Status: ${reference.status}</span>.` : '';

    return `
      <dt id="ref:${name}">${name}</dt>
      <dd>
        <cite><a href="${reference.href}">${reference.title}</a></cite>.
        ${authorMarkup ? `${authorMarkup}; ` : ''}${dateMarkup}${statusMarkup}
      </dd>
    `;
  }).join('');

  return `\n<dl class="reference-list">${items}\n</dl>\n`;
}

function resolveReference(specCorpus, name) {
  const normalizedName = name.replace(/\s+/g, '-').toUpperCase();

  return {
    normalizedName,
    reference: specCorpus[normalizedName] ||
      specCorpus[normalizedName.toLowerCase()] ||
      specCorpus[name.toLowerCase()] ||
      specCorpus[name]
  };
}

function createSpecReferencesPlugin() {
  return {
    name: 'spec-references',
    beforeRender({ packageRoot, state }) {
      state.specGroups = {};
      state.specCorpus = readJson(path.join(packageRoot, 'assets/compiled/refs.json'));
    },
    markdownTemplates({ state }) {
      return [
        {
          filter: type => specNameRegex.test(type),
          parse(token, type, name) {
            if (!name) {
              return;
            }

            const { normalizedName, reference } = resolveReference(state.specCorpus, name);

            if (!reference) {
              return;
            }

            const group = state.specGroups[type] = state.specGroups[type] || {};
            token.info.spec = group[normalizedName] = {
              ...reference,
              _name: normalizedName
            };
          },
          render(token, type, name) {
            if (name) {
              return token.info.spec ? `[<a class="spec-reference" href="#ref:${token.info.spec._name}">${token.info.spec._name}</a>]` : `[[${token.content}]]`;
            }

            const group = state.specGroups[type];
            return group ? renderReferenceGroup(group) : '';
          }
        }
      ];
    }
  };
}

export default createSpecReferencesPlugin;
