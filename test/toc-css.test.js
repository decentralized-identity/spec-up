'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('toc counters increment on list items so nested sections inherit parent numbering', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'index.css'), 'utf8');

  assert.match(css, /\.toc > li\s*\{\s*counter-increment: toc1;/);
  assert.match(css, /\.toc > li > a:before\s*\{[^}]*content:\s*counter\(toc1\)\s+"\.";?/s);
  assert.match(css, /\.toc > li > ul > li\s*\{\s*counter-increment: toc2;/);
  assert.match(css, /\.toc > li > ul > li > a:before\s*\{[^}]*content:\s*counter\(toc1\)\s+"\."\s+counter\(toc2\);/s);
  assert.match(css, /\.toc > li > ul ul li\s*\{\s*counter-increment: toc3;/);
  assert.match(css, /\.toc > li > ul ul li > a:before\s*\{[^}]*content:\s*counter\(toc1\)\s+"\."\s+counter\(toc2\)\s+"\."\s+counter\(toc3\);/s);
  assert.doesNotMatch(css, /\.toc > li a:before\s*\{\s*counter-increment: toc1;/);
});

test('heading counters increment on headings so nested sections inherit the active section number', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'index.css'), 'utf8');

  assert.match(css, /main article h2\s*\{[^}]*counter-reset:\s*h3 h4;[^}]*counter-increment:\s*h2;/s);
  assert.match(css, /main article h3\s*\{[^}]*counter-reset:\s*h4;[^}]*counter-increment:\s*h3;/s);
  assert.match(css, /main article h4\s*\{[^}]*counter-increment:\s*h4;/s);
  assert.match(css, /main article h2:before,\s*main article h3:before,\s*main article h4:before\s*\{[^}]*order:\s*-1;/s);
  assert.match(css, /\.toc-anchor\s*\{[^}]*order:\s*-2;[^}]*align-self:\s*flex-start;[^}]*block-size:\s*1lh;[^}]*margin:\s*0;/s);
  assert.doesNotMatch(css, /main article h2:after\s*\{[^}]*counter-increment:\s*h2;/s);
  assert.doesNotMatch(css, /main article h3:after\s*\{[^}]*counter-increment:\s*h3;/s);
  assert.doesNotMatch(css, /main article h4:after\s*\{[^}]*counter-increment:\s*h4;/s);
});

test('sidebar layout removes drawer body padding and resets toc item offsets', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'index.css'), 'utf8');

  assert.match(css, /wa-page\.spec-up-shell::part\(drawer__body\)\s*\{[^}]*padding:\s*0;/s);
  assert.match(css, /wa-page\.spec-up-shell\[view='desktop'\]::part\(navigation\)\s*\{[^}]*display:\s*flex;/s);
  assert.match(css, /#toc\s*\{[^}]*padding:\s*1\.1rem 1\.1rem 0;/s);
  assert.match(css, /wa-page\.spec-up-shell::part\(menu\)\s*\{[^}]*background-color:\s*rgba\(255 255 255 \/ 0\.03\);/s);
  assert.match(css, /\.spec-up-navigation-title\s*\{[^}]*padding:\s*0 !important;/s);
  assert.match(css, /\.toc li\s*\{[^}]*margin:\s*0;[^}]*padding:\s*0;/s);
  assert.match(css, /\.spec-up-tab-group wa-tab-panel::part\(base\)\s*\{[^}]*padding:\s*0;/s);
  assert.match(css, /\.spec-up-copy-line\s*\{[^}]*display:\s*inline-flex;[^}]*gap:\s*0\.45rem;[^}]*max-width:\s*100%;/s);
  assert.match(css, /\.spec-up-copy-text\s*\{[^}]*padding:\s*0\.15rem 0\.35rem;[^}]*transition:\s*background-color 180ms ease, box-shadow 180ms ease;/s);
  assert.match(css, /\.spec-up-copy-line:has\(wa-copy-button:hover\) \.spec-up-copy-text,\s*\.spec-up-copy-line:has\(wa-copy-button:focus-within\) \.spec-up-copy-text\s*\{[^}]*background-color:\s*color-mix\(in srgb, var\(--wa-color-brand-fill-quiet\) 55%, transparent\);/s);
  assert.match(css, /wa-progress-ring::part\(label\)\s*\{[^}]*font-size:\s*clamp\(0\.65rem,\s*calc\(var\(--size\)\s*\/\s*5\),\s*1\.25rem\);/s);
  assert.match(css, /wa-page\.spec-up-shell\[view='mobile'\]\s*\{[^}]*--menu-width:\s*0;/s);
  assert.match(css, /wa-page\.spec-up-shell\[view='mobile'\]::part\(navigation\)\s*\{[^}]*padding-top:\s*0;[^}]*background-color:\s*transparent;/s);
});

test('header layout keeps actions inline and truncates the title instead of wrapping', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'index.css'), 'utf8');

  assert.match(css, /#app_header\s*\{[^}]*flex-wrap:\s*nowrap;/s);
  assert.match(css, /\.spec-up-brand\s*\{[^}]*flex:\s*1 1 auto;[^}]*flex-wrap:\s*nowrap;[^}]*min-width:\s*0;/s);
  assert.match(css, /\.spec-up-brand-copy\s*\{[^}]*flex:\s*1 1 auto;[^}]*min-width:\s*0;[^}]*overflow:\s*hidden;/s);
  assert.match(css, /\.spec-up-brand-copy strong\s*\{[^}]*display:\s*block;[^}]*white-space:\s*nowrap;[^}]*overflow:\s*hidden;[^}]*text-overflow:\s*ellipsis;/s);
  assert.match(css, /\.spec-up-header-actions\s*\{[^}]*flex:\s*none;[^}]*flex-wrap:\s*nowrap;/s);
  assert.doesNotMatch(css, /@media\s*\(max-width:\s*550px\)\s*\{[\s\S]*#app_header\s*\{[^}]*flex-wrap:\s*wrap;/s);
  assert.doesNotMatch(css, /@media\s*\(max-width:\s*550px\)\s*\{[\s\S]*\.spec-up-brand\s*\{[^}]*flex-wrap:\s*wrap;/s);
  assert.doesNotMatch(css, /@media\s*\(max-width:\s*550px\)\s*\{[\s\S]*\.spec-up-header-actions\s*\{[^}]*width:\s*100%;/s);
});
