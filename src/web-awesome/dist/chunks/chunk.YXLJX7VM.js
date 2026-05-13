/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaCombobox
} from "./chunk.GXHSNEFW.js";

// _bundle_/src/react/combobox/index.ts
import { createComponent } from "@lit/react";
import * as React from "react";
import "@lit/react";
var tagName = "wa-combobox";
var reactWrapper = createComponent({
  tagName,
  elementClass: WaCombobox,
  react: React,
  events: {
    onWaClear: "wa-clear",
    onWaShow: "wa-show",
    onWaAfterShow: "wa-after-show",
    onWaHide: "wa-hide",
    onWaAfterHide: "wa-after-hide",
    onWaCreate: "wa-create",
    onWaInvalid: "wa-invalid"
  },
  displayName: "WaCombobox"
});
var combobox_default = reactWrapper;

export {
  combobox_default
};
