'use strict';

const assert = require('node:assert/strict');
const fsp = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const MarkdownIt = require('markdown-it');

const specUp = require('../index');
const markdownItExtensions = require('../src/markdown-it-extensions');
const { buildPageHtml } = require('../src/template');
const createCoreMarkdownPlugin = require('../src/builtin-plugins/core-markdown');

function getContentSecurityPolicy(html) {
  const match = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/);

  assert.ok(match, 'Expected generated HTML to include a Content-Security-Policy meta tag.');

  return match[1]
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

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
  assert.match(html, /id="spec_up_theme_selector"/);
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
  const csp = getContentSecurityPolicy(html);

  assert.match(html, /class="wa-theme-default"/);
  assert.match(html, /<meta name="color-scheme" content="light dark">/);
  assert.match(html, /const storageKey = 'spec-up-color-scheme';/);
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /script-src 'self' 'unsafe-inline' blob: data:/);
  assert.match(csp, /style-src 'self' 'unsafe-inline' data:/);
  assert.match(csp, /connect-src 'self' data: blob: https:\/\/api\.github\.com https:\/\/ka-f\.fontawesome\.com https:\/\/ka-p\.fontawesome\.com/);
  assert.match(html, /id="spec_up_theme_selector"/);
  assert.match(html, /id="color-scheme-selector-trigger"/);
  assert.match(html, /<wa-dropdown-item value="light">/);
  assert.match(html, /<wa-dropdown-item value="dark">/);
  assert.match(html, /<wa-dropdown-item value="auto">/);
  assert.match(html, /<wa-divider><\/wa-divider>/);
  assert.match(html, /family="classic" name="sun" class="icon-embiggen only-light"/);
  assert.match(html, /family="classic" name="moon" class="icon-embiggen only-dark"/);
  assert.match(html, /<wa-drawer id="repo_issues_drawer"/);
  assert.match(html, /data-drawer="open repo_issues_drawer"/);
  assert.match(html, /<wa-icon family="brands" name="github"><\/wa-icon>\s*Issues/);
  assert.match(html, /<wa-button[^>]*data-toggle-nav[^>]*>\s*<wa-icon name="bars"><\/wa-icon>\s*<\/wa-button>/);
  assert.match(html, /<div slot="navigation-header" class="spec-up-navigation-title">\s*<strong>Drawer Test<\/strong>/);
  assert.match(html, /<div class="spec-up-drawer-title-row">/);
  assert.match(html, /<div class="spec-up-drawer-title-row">[\s\S]*<div class="spec-up-drawer-title-actions"><\/div>\s*<\/div>\s*<div class="spec-up-issues-search-row">/);
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

test('template CSP allows remote asset origins and dev-server sockets', () => {
  const html = buildPageHtml({
    articleHtml: '<p>Spec body</p>',
    assetTags: {
      body: '<script src="https://cdn.example.com/site.js"></script>',
      head: '<script type="module" src="http://127.0.0.1:5173/@vite/client"></script><link href="https://cdn.example.com/site.css" rel="stylesheet"/>',
      svg: ''
    },
    externalReferencesHtml: '',
    spec: {
      config: {},
      title: 'CSP Asset Test'
    },
    tocHtml: '',
    tocMeta: {
      count: 0,
      levelCounts: { 2: 0, 3: 0, 4: 0 }
    }
  });
  const csp = getContentSecurityPolicy(html);

  assert.match(csp, /script-src[\s\S]*http:\/\/127\.0\.0\.1:5173[\s\S]*https:\/\/cdn\.example\.com/);
  assert.match(csp, /style-src[\s\S]*http:\/\/127\.0\.0\.1:5173[\s\S]*https:\/\/cdn\.example\.com/);
  assert.match(csp, /connect-src[\s\S]*http:\/\/127\.0\.0\.1:5173/);
  assert.match(csp, /connect-src[\s\S]*ws:\/\/127\.0\.0\.1:5173/);
  assert.match(csp, /connect-src[\s\S]*https:\/\/cdn\.example\.com/);
  assert.match(csp, /connect-src[\s\S]*wss:\/\/cdn\.example\.com/);
});

test('vite body entry does not load the legacy Font Awesome CSS kit', async () => {
  const bodyEntry = await fsp.readFile(path.join(__dirname, '..', 'src', 'vite', 'body.js'), 'utf8');

  assert.doesNotMatch(bodyEntry, /font-awesome\.js/);
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

test('core markdown renders ::: tabs blocks as Web Awesome tabs with markdown content in each panel', async () => {
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
::: tabs

:: Tab Title 1

Foo *test*

\`\`\`json
{"foo":"bar"}
\`\`\`

:: Tab Title 2

Bar test

\`\`\`json
{"bar":"baz"}
\`\`\`

:::
`);
  const html = plugin.transformRenderedHtml({ html: rendered });

  assert.match(html, /<wa-tab-group class="spec-up-tab-group" active="tab-title-1">/);
  assert.match(html, /<wa-tab panel="tab-title-1">Tab Title 1<\/wa-tab>/);
  assert.match(html, /<wa-tab panel="tab-title-2">Tab Title 2<\/wa-tab>/);
  assert.match(html, /<wa-tab-panel name="tab-title-1"><p>Foo <em>test<\/em><\/p>[\s\S]*<pre class="language-json"><code class="language-json">[\s\S]*"foo"[\s\S]*"bar"[\s\S]*<\/code><\/pre><\/wa-tab-panel>/);
  assert.match(html, /<wa-tab-panel name="tab-title-2"><p>Bar test<\/p>[\s\S]*<pre class="language-json"><code class="language-json">[\s\S]*"bar"[\s\S]*"baz"[\s\S]*<\/code><\/pre><\/wa-tab-panel>/);
  assert.doesNotMatch(html, /<p>::: tabs<\/p>/);
  assert.doesNotMatch(html, /<p>:: Tab Title 1<\/p>/);
});

test('core markdown renders ::: carousel blocks as Web Awesome carousels with markdown content in each panel', async () => {
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
::: carousel

First panel *content*

::

![The Spec-Up logo](logo.svg "Spec-Up Logo")

::

Third panel **content**

:::
`);
  const html = plugin.transformRenderedHtml({ html: rendered });

  assert.match(html, /<wa-carousel class="spec-up-carousel" navigation="" pagination="" mouse-dragging="">/);
  assert.match(html, /<wa-carousel-item><p>First panel <em>content<\/em><\/p><\/wa-carousel-item>/);
  assert.match(html, /<wa-carousel-item><p><img src="logo\.svg" alt="The Spec-Up logo" title="Spec-Up Logo"><\/p><\/wa-carousel-item>/);
  assert.match(html, /<wa-carousel-item><p>Third panel <strong>content<\/strong><\/p><\/wa-carousel-item>/);
  assert.doesNotMatch(html, /<p>::: carousel<\/p>/);
  assert.doesNotMatch(html, /<p>::<\/p>/);
});

test('core markdown renders ::: summary blocks as Web Awesome details components', async () => {
  const plugin = createCoreMarkdownPlugin();
  const state = {};
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  await plugin.beforeRender({ state });
  plugin.configureMarkdownIt({ md, state });

  const html = plugin.transformRenderedHtml({
    html: md.render(`
::: summary My summary text here
Details of what I want to show here.

\`\`\`json
{"foo":"bar"}
\`\`\`
:::
`)
  });

  assert.match(html, /<wa-details class="spec-up-details" summary="My summary text here">/);
  assert.match(html, /<p>Details of what I want to show here\.<\/p>/);
  assert.match(html, /<pre class="language-json"><code class="language-json">[\s\S]*"foo"[\s\S]*"bar"[\s\S]*<\/code><\/pre>/);
  assert.doesNotMatch(html, /<p>::: summary My summary text here<\/p>/);
});

test('core markdown renders [[badge: ...]] tokens as Web Awesome badges with default and explicit variants', async () => {
  const plugin = createCoreMarkdownPlugin();
  const state = {};
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  await plugin.beforeRender({ state });
  md.use(markdownItExtensions, plugin.markdownTemplates({ state }));
  plugin.configureMarkdownIt({ md, state });

  const rendered = md.render(`
Default: [[badge: All Systems Operational]]

Explicit: [[badge: Needs Attention, warning]]
`);
  const html = plugin.transformRenderedHtml({ html: rendered });

  assert.match(html, /<wa-badge variant="brand">All Systems Operational<\/wa-badge>/);
  assert.match(html, /<wa-badge variant="warning">Needs Attention<\/wa-badge>/);
});

test('core markdown renders [[progress: ...]] tokens as Web Awesome progress elements with percentage labels and optional sizing', async () => {
  const plugin = createCoreMarkdownPlugin();
  const state = {};
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  await plugin.beforeRender({ state });
  md.use(markdownItExtensions, plugin.markdownTemplates({ state }));
  plugin.configureMarkdownIt({ md, state });

  const rendered = md.render(`
Bar: [[progress: bar, 50]]

Ring: [[progress: ring, 75]]

Sized bar: [[progress: bar, 50, 50%]]

Sized ring: [[progress: ring, 75, 3rem]]
`);
  const html = plugin.transformRenderedHtml({ html: rendered });

  assert.match(html, /<wa-progress-bar value="50">50%<\/wa-progress-bar>/);
  assert.match(html, /<wa-progress-ring value="75">75%<\/wa-progress-ring>/);
  assert.match(html, /<wa-progress-bar value="50" style="width: 50%;">50%<\/wa-progress-bar>/);
  assert.match(html, /<wa-progress-ring value="75" style="--size: 3rem;">75%<\/wa-progress-ring>/);
});

test('core markdown renders [[time: ...]] tokens as Web Awesome relative time elements', async () => {
  const plugin = createCoreMarkdownPlugin();
  const state = {};
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  await plugin.beforeRender({ state });
  md.use(markdownItExtensions, plugin.markdownTemplates({ state }));
  plugin.configureMarkdownIt({ md, state });

  const rendered = md.render(`
Long: [[time: 2020-07-15T09:17:00-04:00, long]]

Short: [[time: 2020-07-15T09:17:00-04:00, short]]

Default: [[time: 2020-07-15T09:17:00-04:00]]
`);
  const html = plugin.transformRenderedHtml({ html: rendered });

  assert.match(html, /<wa-relative-time date="2020-07-15T09:17:00-04:00" format="long"><\/wa-relative-time>/);
  assert.match(html, /<wa-relative-time date="2020-07-15T09:17:00-04:00" format="short"><\/wa-relative-time>/);
  assert.match(html, /<wa-relative-time date="2020-07-15T09:17:00-04:00"><\/wa-relative-time>/);
});

test('core markdown renders [[copy: ...]] tokens as copy lines with Web Awesome copy buttons', async () => {
  const plugin = createCoreMarkdownPlugin();
  const state = {};
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  await plugin.beforeRender({ state });
  md.use(markdownItExtensions, plugin.markdownTemplates({ state }));
  plugin.configureMarkdownIt({ md, state });

  const rendered = md.render(`
Copy this: [[copy: did:key:z6Mkf4XhsxVYQ1nQ6V6k4Q9j7xVjQm1Qw9Yk6B8JfP3L2mN4]]
`);
  const html = plugin.transformRenderedHtml({ html: rendered });

  assert.match(html, /<span class="spec-up-copy-line">/);
  assert.match(html, /<span class="spec-up-copy-text" id="spec-up-copy-target-1">did:key:z6Mkf4XhsxVYQ1nQ6V6k4Q9j7xVjQm1Qw9Yk6B8JfP3L2mN4<\/span>/);
  assert.match(html, /<wa-copy-button class="spec-up-copy-button" from="spec-up-copy-target-1" copy-label="Copy" success-label="Copied" error-label="Copy failed"><\/wa-copy-button>/);
});

test('core markdown renders [[qr: ...]] tokens as Web Awesome qr codes with optional size', async () => {
  const plugin = createCoreMarkdownPlugin();
  const state = {};
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  await plugin.beforeRender({ state });
  md.use(markdownItExtensions, plugin.markdownTemplates({ state }));
  plugin.configureMarkdownIt({ md, state });

  const rendered = md.render(`
Default: [[qr: github.com/csuwildcat]]

Sized: [[qr: github.com/csuwildcat, 128]]
`);
  const html = plugin.transformRenderedHtml({ html: rendered });

  assert.match(html, /<wa-qr-code value="github\.com\/csuwildcat"><\/wa-qr-code>/);
  assert.match(html, /<wa-qr-code value="github\.com\/csuwildcat" size="128"><\/wa-qr-code>/);
});
