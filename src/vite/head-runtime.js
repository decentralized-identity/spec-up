import '../../assets/js/utils.js';
import { registerIconLibrary } from '../web-awesome/dist/components/icon/library.js';
import { icons as systemIcons } from '../web-awesome/dist/chunks/chunk.DSSPBSBT.js';

const SPEC_UP_ICON_NAMES = new Set([
  'bars',
  'circle-check',
  'circle-exclamation',
  'circle-info',
  'github',
  'moon',
  'search',
  'sun',
  'triangle-exclamation'
]);

const SYSTEM_ICON_FALLBACK = 'circle-question';
const COMPILED_ICON_BASE_PATH = 'assets/compiled/icon-library';
const DEFAULT_ICON_BASE_PATH = `${COMPILED_ICON_BASE_PATH}/default`;
const SYSTEM_ICON_BASE_PATH = `${COMPILED_ICON_BASE_PATH}/system`;

function getSystemVariant(name, variant = 'solid') {
  if (systemIcons[variant]?.[name]) {
    return variant;
  }

  if (systemIcons.regular?.[name]) {
    return 'regular';
  }

  return 'regular';
}

function getDefaultVariant(name, variant = 'solid') {
  if (name === 'bars') {
    return 'solid';
  }

  return getSystemVariant(name, variant);
}

function getDefaultIconName(name) {
  if (name === 'bars' || systemIcons.solid?.[name] || systemIcons.regular?.[name]) {
    return name;
  }

  return SYSTEM_ICON_FALLBACK;
}

registerIconLibrary('default', {
  resolver(name, _family = 'classic', variant = 'solid') {
    const resolvedName = getDefaultIconName(name);
    return `${DEFAULT_ICON_BASE_PATH}/${getDefaultVariant(resolvedName, variant)}/${resolvedName}.svg`;
  }
});

registerIconLibrary('system', {
  resolver(name, _family = 'classic', variant = 'solid') {
    const resolvedName = systemIcons[variant]?.[name] || systemIcons.regular?.[name] ? name : SYSTEM_ICON_FALLBACK;
    return `${SYSTEM_ICON_BASE_PATH}/${getSystemVariant(name, variant)}/${resolvedName}.svg`;
  }
});

registerIconLibrary('spec-up', {
  resolver(name) {
    return SPEC_UP_ICON_NAMES.has(name) ? `${COMPILED_ICON_BASE_PATH}/spec-up/${name}.svg` : '';
  }
});
