/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaDropdown
} from "./chunk.MTG56AZP.js";

// _bundle_/src/react/dropdown/index.ts
import { createComponent } from "@lit/react";
import * as React from "react";
import "@lit/react";
var tagName = "wa-dropdown";
var reactWrapper = createComponent({
  tagName,
  elementClass: WaDropdown,
  react: React,
  events: {
    onWaShow: "wa-show",
    onWaAfterShow: "wa-after-show",
    onWaHide: "wa-hide",
    onWaAfterHide: "wa-after-hide",
    onWaSelect: "wa-select"
  },
  displayName: "WaDropdown"
});
var dropdown_default = reactWrapper;

export {
  dropdown_default
};
