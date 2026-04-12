import '../../assets/js/utils.js';
import { registerIconLibrary } from '../web-awesome/dist-cdn/components/icon/library.js';
import { icons as systemIcons } from '../web-awesome/dist-cdn/chunks/chunk.DSSPBSBT.js';

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

function getSystemVariant(name, variant = 'solid') {
  if (systemIcons[variant]?.[name]) {
    return variant;
  }

  if (systemIcons.regular?.[name]) {
    return 'regular';
  }

  return 'regular';
}

registerIconLibrary('system', {
  resolver(name, _family = 'classic', variant = 'solid') {
    const resolvedName = systemIcons[variant]?.[name] || systemIcons.regular?.[name] ? name : SYSTEM_ICON_FALLBACK;
    return `${COMPILED_ICON_BASE_PATH}/system/${getSystemVariant(name, variant)}/${resolvedName}.svg`;
  }
});

registerIconLibrary('spec-up', {
  resolver(name) {
    return SPEC_UP_ICON_NAMES.has(name) ? `${COMPILED_ICON_BASE_PATH}/spec-up/${name}.svg` : '';
  }
});
