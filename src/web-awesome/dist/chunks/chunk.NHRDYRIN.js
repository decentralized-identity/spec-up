/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  icons as systemIcons
} from "./chunk.DSSPBSBT.js";

// _bundle_/src/components/icon/library.default.ts
var DEFAULT_ICON_BASE_PATH = "assets/compiled/icon-library/default";
var SYSTEM_ICON_FALLBACK = "circle-question";
function getDefaultIconName(name) {
  if (name === "bars" || systemIcons.solid?.[name] || systemIcons.regular?.[name]) {
    return name;
  }
  return SYSTEM_ICON_FALLBACK;
}
function getDefaultVariant(name, variant = "solid") {
  if (name === "bars") {
    return "solid";
  }
  if (systemIcons[variant]?.[name]) {
    return variant;
  }
  return "regular";
}
var library = {
  name: "default",
  resolver: (name, _family = "classic", variant = "solid") => {
    const resolvedName = getDefaultIconName(name);
    return `${DEFAULT_ICON_BASE_PATH}/${getDefaultVariant(resolvedName, variant)}/${resolvedName}.svg`;
  }
};
var library_default_default = library;

export {
  library_default_default
};
