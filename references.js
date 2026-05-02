import { JSDOM } from 'jsdom';
import { slugifyTerm } from './src/utils.js';

function validateReferences(references, definitions, html) {
  const unresolvedRefs = [];

  for (const ref of new Set(references)) {
    if (!html.includes(`id="term:${slugifyTerm(ref)}"`)) {
      unresolvedRefs.push(ref);
    }
  }

  const danglingDefs = [];

  for (const synonyms of definitions) {
    const isReferenced = synonyms.some(definition => {
      return html.includes(`href="#term:${slugifyTerm(definition)}"`);
    });

    if (!isReferenced && synonyms[0]) {
      danglingDefs.push(synonyms[0]);
    }
  }

  return {
    danglingDefs,
    unresolvedRefs
  };
}

function logReferenceWarnings(results, logger = console) {
  if (results.unresolvedRefs.length > 0) {
    logger.log('Unresolved References:', results.unresolvedRefs);
  }

  if (results.danglingDefs.length > 0) {
    logger.log('Dangling Definitions:', results.danglingDefs);
  }
}

function findExternalSpecByKey(externalSpecs = [], key) {
  for (const entry of externalSpecs) {
    if (entry && typeof entry === 'object' && Object.prototype.hasOwnProperty.call(entry, key)) {
      return entry[key];
    }
  }

  return null;
}

async function fetchExternalSpecs(externalSpecs = [], options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;

  if (typeof fetchImpl !== 'function') {
    throw new Error('A fetch implementation is required to resolve external specs.');
  }

  const results = await Promise.all(externalSpecs.map(async entry => {
    const [title, url] = Object.entries(entry || {})[0] || [];

    if (!title || !url) {
      return '';
    }

    const response = await fetchImpl(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch external spec "${title}" from ${url}: ${response.status}`);
    }

    return createNewDLWithTerms(title, await response.text());
  }));

  return results.filter(Boolean).join('\n');
}

function createNewDLWithTerms(title, html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const newDl = document.createElement('dl');

  newDl.setAttribute('id', title);

  const terms = document.querySelectorAll('dt span[id^="term:"]');

  for (const term of terms) {
    const [, localId] = term.id.split(':');
    const dt = term.closest('dt');
    const dd = dt ? dt.nextElementSibling : null;

    term.id = `term:${title}:${localId}`;

    if (dt) {
      newDl.appendChild(dt.cloneNode(true));
    }

    if (dd && dd.tagName === 'DD') {
      newDl.appendChild(dd.cloneNode(true));
    }
  }

  return newDl.outerHTML;
}

export {
  createNewDLWithTerms,
  fetchExternalSpecs,
  findExternalSpecByKey,
  logReferenceWarnings,
  slugifyTerm,
  validateReferences
};
