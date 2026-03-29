'use strict';

const assert = require('node:assert/strict');
const fsp = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const MarkdownIt = require('markdown-it');

const specUp = require('../index');
const { buildPageHtml } = require('../src/template');
const createCoreMarkdownPlugin = require('../src/builtin-plugins/core-markdown');

test('renders custom plugins alongside built-in reference and katex plugins', async t => {
  const root = await fsp.mkdtemp(path.join(os.tmpdir(), 'spec-up-'));
  const specDirectory = path.join(root, 'spec');
  const pluginDirectory = path.join(root, 'plugins');
  const outputDirectory = path.join(root, 'dist');
  const configPath = path.join(root, 'specs.json');

  t.after(async () => {
    await fsp.rm(root, { force: true, recursive: true });
  });

  await fsp.mkdir(specDirectory, { recursive: true });
  await fsp.mkdir(pluginDirectory, { recursive: true });

  await fsp.writeFile(path.join(pluginDirectory, 'test-plugin.js'), `
module.exports = function createTestPlugin() {
  return {
    name: 'test-plugin',
    markdownTemplates() {
      return [{
        filter(type) {
          return type === 'shout';
        },
        render(token, type, value) {
          return '<strong data-plugin="shout">' + String(value).toUpperCase() + '</strong>';
        }
      }];
    },
    transformPageHtml({ html }) {
      return html.replace('</body>', '<div id="page-plugin">plugin</div></body>');
    }
  };
};
`);

  await fsp.writeFile(path.join(specDirectory, 'spec.md'), `
Plugin Test
===========

## Terms

[[def: Thing]]:
~ A useful thing.

Reference: [[ref: Thing]] and [[shout: hello plugin]]

## Math

$x^2$
`);

  await fsp.writeFile(configPath, JSON.stringify({
    specs: [
      {
        title: 'Plugin Test',
        spec_directory: './spec',
        output_path: './dist',
        katex: true,
        plugins: [
          './plugins/test-plugin.js'
        ]
      }
    ]
  }, null, 2));

  const messages = [];
  const logger = {
    error(...args) {
      messages.push(args.join(' '));
    },
    log(...args) {
      messages.push(args.join(' '));
    },
    warn(...args) {
      messages.push(args.join(' '));
    }
  };

  await specUp({
    configPath,
    cwd: root,
    logger,
    nowatch: true
  });

  const html = await fsp.readFile(path.join(outputDirectory, 'index.html'), 'utf8');

  assert.match(html, /class="term-reference" href="#term:thing"/);
  assert.match(html, /id="term:thing"/);
  assert.match(html, /data-plugin="shout">HELLO PLUGIN<\/strong>/);
  assert.match(html, /id="page-plugin"/);
  assert.match(html, /<wa-page class="spec-up-shell"/);
  assert.match(html, /class="toc-anchor" href="#terms"/);
  assert.match(html, /<script src="assets\/compiled\/head\.js"><\/script>/);
  assert.match(html, /<script src="assets\/compiled\/body\.js"><\/script>/);
  assert.match(html, /<script src="assets\/compiled\/katex\.js"><\/script>/);
  await assert.doesNotReject(() => fsp.access(path.join(outputDirectory, 'assets', 'compiled', 'head.js')));
  await assert.doesNotReject(() => fsp.access(path.join(outputDirectory, 'assets', 'compiled', 'body.js')));
  assert.deepEqual(messages, ['Rendering: Plugin Test']);
});

test('renders github issues as a searchable drawer and moves the spec title into navigation header', () => {
  const html = buildPageHtml({
    articleHtml: '<h1 id="intro">Intro</h1><p>Spec body</p>',
    assetTags: {
      body: '',
      head: '',
      svg: ''
    },
    externalReferencesHtml: '',
    spec: {
      config: {},
      source: {
        account: 'openai',
        host: 'github',
        repo: 'spec-up'
      },
      title: 'Drawer Test'
    },
    tocHtml: '<ol class="toc"><li><a class="toc-anchor" href="#intro">Intro</a></li></ol>',
    tocMeta: {
      count: 1,
      levelCounts: { 2: 1, 3: 0, 4: 0 }
    }
  });

  assert.match(html, /class="wa-theme-default"/);
  assert.match(html, /<wa-drawer id="repo_issues_drawer"/);
  assert.match(html, /data-drawer="open repo_issues_drawer"/);
  assert.match(html, /<wa-icon family="brands" name="github"><\/wa-icon>\s*Issues/);
  assert.match(html, /<wa-button[^>]*data-toggle-nav[^>]*>\s*<wa-icon name="bars"><\/wa-icon>\s*<\/wa-button>/);
  assert.match(html, /<div slot="navigation-header" class="spec-up-navigation-title">\s*<strong>Drawer Test<\/strong>/);
  assert.match(html, /<div class="spec-up-drawer-title-row">/);
  assert.match(html, /<div class="spec-up-issues-search-row">/);
  assert.match(html, /<wa-input id="repo_issue_search" type="search" placeholder="Search open issues"/);
  assert.match(html, /<wa-icon slot="start" name="search" label="Search GitHub issues"><\/wa-icon>/);
  assert.match(html, /<span slot="end" class="spec-up-issues-search-end">/);
  assert.match(html, /<span id="repo_issue_search_spinner" class="spec-up-issues-search-spinner" hidden aria-hidden="true">\s*<wa-spinner><\/wa-spinner>\s*<\/span>/);
  assert.match(html, /<button id="repo_issue_search_clear" type="button" aria-label="Clear issue search" disabled>Clear<\/button>/);
  assert.match(html, /<div class="spec-up-drawer-title-actions"><\/div>/);
  assert.match(html, /<div id="repo_issue_load_more" class="spec-up-issues-loading" hidden>/);
  assert.doesNotMatch(html, /Spec-Up with Web Awesome/);
  assert.doesNotMatch(html, /class="spec-up-sidebar-title"/);
  assert.doesNotMatch(html, /Recent Issues/);
  assert.doesNotMatch(html, /spec-up-drawer-intro/);
  assert.doesNotMatch(html, /spec-up-drawer-view-link/);
  assert.doesNotMatch(html, /slot="header-actions"/);
  assert.doesNotMatch(html, /Source Repository|Commit History|Navigation|Table of Contents/);
  assert.doesNotMatch(html, /slot="footer"/);
  assert.doesNotMatch(html, /slot="main-header"/);
  assert.doesNotMatch(html, /spec-up-document-card/);
});

test('core markdown renders notices as callouts and converts legacy tab panels to Web Awesome tabs', async () => {
  const plugin = createCoreMarkdownPlugin();
  const state = {};
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  await plugin.beforeRender({ state });
  plugin.configureMarkdownIt({ md, state });

  const rendered = md.render(`
::: note Basic Note
Check this out.
:::

::: example Code Example
\`\`\`json
{"foo":"bar"}
\`\`\`
:::

<tab-panels selected-index="1">
  <nav>
    <button type="button">First Tab</button>
    <button type="button">Second Tab</button>
  </nav>
  <section><p>Alpha</p></section>
  <section><p>Beta</p></section>
</tab-panels>

\`\`\`chart
{"type":"pie","data":{"labels":["Red","Blue"],"datasets":[{"data":[3,2]}]}}
\`\`\`
`);
  const html = plugin.transformRenderedHtml({ html: rendered });

  assert.match(html, /<wa-callout id="basic-note" class="spec-up-notice spec-up-notice--note" variant="brand" appearance="filled-outlined">/);
  assert.match(html, /<wa-icon slot="icon" name="circle-info" label="note"><\/wa-icon>/);
  assert.doesNotMatch(html, /<span class="spec-up-notice-title">Basic Note<\/span>/);
  assert.match(html, /<wa-callout id="code-example" class="spec-up-notice spec-up-notice--example" variant="neutral" appearance="filled-outlined"><div class="spec-up-notice-heading"><a class="notice-link" href="#code-example">EXAMPLE<\/a><span class="spec-up-notice-title">Code Example<\/span><\/div>/);
  assert.doesNotMatch(html, /spec-up-notice--example"[^>]*><wa-icon/s);
  assert.match(html, /<wa-tab-group class="spec-up-tab-group" active="second-tab">/);
  assert.match(html, /<wa-tab panel="first-tab">First Tab<\/wa-tab>/);
  assert.match(html, /<wa-tab-panel name="second-tab"><p>Beta<\/p><\/wa-tab-panel>/);
  assert.match(html, /<wa-chart class="spec-up-chart" label="Pie chart" description="Chart rendered from specification content."><script type="application\/json">/);
  assert.doesNotMatch(html, /<canvas class="chartjs">/);
  assert.doesNotMatch(html, /<tab-panels/);
});
