'use strict';

const chokidar = require('chokidar');
const path = require('node:path');
const { relativeTo, resolveProjectFile, unique } = require('./utils');

function customAssetWatchPaths(projectRoot, spec) {
  return (spec.assets || [])
    .map(asset => resolveProjectFile(projectRoot, asset.path))
    .filter(Boolean);
}

function buildWatchPaths({ pluginWatchPaths, projectRoot, spec }) {
  return unique([
    path.join(spec.specDirectory, '**/*'),
    ...customAssetWatchPaths(projectRoot, spec),
    ...pluginWatchPaths
  ]);
}

function buildIgnorePaths(spec) {
  return [
    path.join(spec.destination, 'index.html'),
    path.join(spec.destination, 'assets', 'compiled/**/*'),
    path.join(spec.destination, 'fonts/**/*')
  ];
}

function createRenderScheduler(renderFn) {
  let running = false;
  let pending = false;

  return async function scheduleRender() {
    if (running) {
      pending = true;
      return;
    }

    running = true;

    do {
      pending = false;
      await renderFn();
    } while (pending);

    running = false;
  };
}

function watchSpec({ logger, pluginWatchPaths, projectRoot, renderFn, spec }) {
  const scheduleRender = createRenderScheduler(renderFn);
  const watcher = chokidar.watch(buildWatchPaths({
    pluginWatchPaths,
    projectRoot,
    spec
  }), {
    ignoreInitial: true,
    ignored: buildIgnorePaths(spec)
  });

  watcher.on('all', async (eventName, changedPath) => {
    logger.log(`Change detected (${eventName}): ${relativeTo(projectRoot, changedPath)}`);
    await scheduleRender();
  });

  return watcher;
}

module.exports = {
  buildIgnorePaths,
  buildWatchPaths,
  createRenderScheduler,
  customAssetWatchPaths,
  watchSpec
};
