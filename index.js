import { runSpecUp } from './src/run-spec-up.js';

export default function specUp(options = {}) {
  return runSpecUp(options);
}

export { loadSpecContexts, renderSpec, runSpecUp } from './src/run-spec-up.js';
