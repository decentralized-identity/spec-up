'use strict';

const { runSpecUp } = require('./src/run-spec-up');

module.exports = function specUp(options = {}) {
  return runSpecUp(options);
};
