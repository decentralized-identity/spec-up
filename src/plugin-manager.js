'use strict';

const path = require('node:path');
const { resolveProjectFile, unique, unwrapDefault } = require('./utils');

const PLUGIN_HOOKS = new Set([
  'afterRender',
  'afterWrite',
  'beforeRender',
  'configureMarkdownIt',
  'extendAssetTags',
  'getWatchPatterns',
  'markdownTemplates',
  'transformMarkdown',
  'transformPageHtml',
  'transformRenderedHtml'
]);

function normalizePluginEntry(entry, projectRoot) {
  if (!entry) {
    return null;
  }

  if (typeof entry === 'string') {
    return {
      sourcePath: resolveProjectFile(projectRoot, entry),
      type: 'path'
    };
  }

  if (typeof entry === 'function') {
    return {
      type: 'value',
      value: entry
    };
  }

  if (typeof entry === 'object' && typeof entry.resolve === 'string') {
    return {
      options: entry.options || {},
      sourcePath: resolveProjectFile(projectRoot, entry.resolve),
      type: 'path'
    };
  }

  if (typeof entry === 'object') {
    return {
      type: 'value',
      value: entry
    };
  }

  throw new TypeError(`Unsupported plugin entry: ${String(entry)}`);
}

function normalizePluginEntries(entries, projectRoot) {
  return entries.map(entry => normalizePluginEntry(entry, projectRoot)).filter(Boolean);
}

function looksLikePlugin(candidate) {
  return Boolean(candidate) && [...PLUGIN_HOOKS].some(hook => typeof candidate[hook] === 'function');
}

function instantiatePlugin(candidate, options = {}) {
  const unwrapped = unwrapDefault(candidate);

  if (typeof unwrapped === 'function') {
    const instance = unwrapped(options);

    if (instance && typeof instance === 'object') {
      return instance;
    }

    if (looksLikePlugin(unwrapped)) {
      return unwrapped;
    }

    throw new TypeError('Plugin factories must return a plugin object.');
  }

  if (unwrapped && typeof unwrapped === 'object') {
    return unwrapped;
  }

  throw new TypeError('Plugins must be an object or a factory function.');
}

function pluginName(plugin, fallback) {
  if (plugin.name) {
    return plugin.name;
  }

  return fallback;
}

function loadPlugin(entry) {
  if (entry.type === 'path') {
    delete require.cache[require.resolve(entry.sourcePath)];
    return instantiatePlugin(require(entry.sourcePath), entry.options);
  }

  return instantiatePlugin(entry.value, entry.options);
}

function createPluginManager(entries, projectRoot) {
  const normalizedEntries = normalizePluginEntries(entries, projectRoot);

  function getWatchPaths() {
    return unique(normalizedEntries.filter(entry => entry.type === 'path').map(entry => entry.sourcePath));
  }

  function loadPlugins() {
    return normalizedEntries.map((entry, index) => {
      const plugin = loadPlugin(entry);
      plugin.name = pluginName(plugin, entry.sourcePath ? path.basename(entry.sourcePath, path.extname(entry.sourcePath)) : `plugin-${index + 1}`);
      plugin.sourcePath = entry.sourcePath || null;
      return plugin;
    });
  }

  async function runHook(plugins, hookName, context) {
    for (const plugin of plugins) {
      if (typeof plugin[hookName] !== 'function') {
        continue;
      }

      await plugin[hookName](context);
    }
  }

  async function collectHook(plugins, hookName, context) {
    const results = [];

    for (const plugin of plugins) {
      if (typeof plugin[hookName] !== 'function') {
        continue;
      }

      const value = await plugin[hookName](context);

      if (Array.isArray(value)) {
        results.push(...value);
      }
      else if (value !== undefined && value !== null) {
        results.push(value);
      }
    }

    return results;
  }

  async function transform(plugins, hookName, valueName, value, context) {
    let current = value;

    for (const plugin of plugins) {
      if (typeof plugin[hookName] !== 'function') {
        continue;
      }

      const next = await plugin[hookName]({
        ...context,
        [valueName]: current
      });

      if (next !== undefined) {
        current = next;
      }
    }

    return current;
  }

  return {
    collectHook,
    getWatchPaths,
    loadPlugins,
    runHook,
    transform
  };
}

module.exports = {
  createPluginManager
};
