import {
  fetchExternalSpecs,
  findExternalSpecByKey,
  logReferenceWarnings,
  slugifyTerm,
  validateReferences
} from '../../references.js';

const terminologyRegex = /^def$|^ref$|^xref/i;

function createTerminologyPlugin() {
  return {
    name: 'terminology',
    async beforeRender({ logger, spec, state }) {
      state.definitions = [];
      state.references = [];
      state.unresolvedExternalReferences = [];
      state.externalReferencesHtml = '';

      if (Array.isArray(spec.external_specs) && spec.external_specs.length > 0) {
        try {
          state.externalReferencesHtml = await fetchExternalSpecs(spec.external_specs);
        }
        catch (error) {
          logger.warn(`Unable to fetch external spec references for "${spec.title}": ${error.message}`);
        }
      }
    },
    async afterRender({ html, logger, state }) {
      const results = validateReferences(state.references, state.definitions, html);
      logReferenceWarnings(results, logger);

      if (state.unresolvedExternalReferences.length > 0) {
        logger.log('Unresolved External References:', state.unresolvedExternalReferences);
      }
    },
    markdownTemplates({ spec, state }) {
      return [
        {
          filter: type => terminologyRegex.test(type),
          parse(token, type, primary) {
            if (!primary && type !== 'xref') {
              return '';
            }

            if (type === 'def') {
              const synonyms = token.info.args.slice();
              state.definitions.push(synonyms);

              return synonyms.reduce((html, synonym) => {
                return `<span id="term:${slugifyTerm(synonym)}">${html}</span>`;
              }, primary);
            }

            if (type === 'xref') {
              const [specKey, termLabel] = token.info.args;
              const url = findExternalSpecByKey(spec.external_specs || [], specKey);

              if (!url || !termLabel) {
                state.unresolvedExternalReferences.push(token.info.args.join(', '));
                return primary || '';
              }

              const termSlug = slugifyTerm(termLabel);

              return `<a class="term-reference" data-local-href="#term:${specKey}:${termSlug}" href="${url}#term:${termSlug}">${termLabel}</a>`;
            }

            state.references.push(primary);
            return `<a class="term-reference" href="#term:${slugifyTerm(primary)}">${primary}</a>`;
          }
        }
      ];
    }
  };
}

export default createTerminologyPlugin;
