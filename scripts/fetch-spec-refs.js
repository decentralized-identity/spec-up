'use strict';

const path = require('node:path');
const fsp = require('node:fs/promises');

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

async function main() {
  const refs = await Promise.all([
    fetchJson('https://raw.githubusercontent.com/tobie/specref/master/refs/ietf.json'),
    fetchJson('https://raw.githubusercontent.com/tobie/specref/master/refs/w3c.json'),
    fetchJson('https://raw.githubusercontent.com/tobie/specref/master/refs/whatwg.json')
  ]);
  const merged = Object.assign({}, ...refs);
  const outputPath = path.join(__dirname, '..', 'assets/compiled/refs.json');

  await fsp.mkdir(path.dirname(outputPath), { recursive: true });
  await fsp.writeFile(outputPath, JSON.stringify(merged));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
