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
  assert.match(css, /\.toc-anchor\s*\{[^}]*order:\s*-2;[^}]*align-self:\s*center;[^}]*margin:\s*0;/s);
  assert.doesNotMatch(css, /main article h2:after\s*\{[^}]*counter-increment:\s*h2;/s);
  assert.doesNotMatch(css, /main article h3:after\s*\{[^}]*counter-increment:\s*h3;/s);
  assert.doesNotMatch(css, /main article h4:after\s*\{[^}]*counter-increment:\s*h4;/s);
});

test('sidebar layout removes drawer body padding and resets toc item offsets', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'index.css'), 'utf8');

  assert.match(css, /wa-page\.spec-up-shell::part\(drawer__body\)\s*\{[^}]*padding:\s*0;/s);
  assert.match(css, /#toc\s*\{[^}]*padding:\s*0 0\.95rem 0 0\.95rem;/s);
  assert.match(css, /\.spec-up-navigation-title\s*\{[^}]*padding:\s*0 !important;/s);
  assert.match(css, /\.toc li\s*\{[^}]*margin:\s*0;[^}]*padding:\s*0;/s);
  assert.match(css, /\.spec-up-tab-group wa-tab-panel::part\(base\)\s*\{[^}]*padding:\s*0;/s);
});
