/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaSelect
} from "./chunk.SKORIUHE.js";

// _bundle_/src/react/select/index.ts
import { createComponent } from "@lit/react";
import * as React from "react";
import "@lit/react";
var tagName = "wa-select";
var reactWrapper = createComponent({
  tagName,
  elementClass: WaSelect,
  react: React,
  events: {
    onWaClear: "wa-clear",
    onWaShow: "wa-show",
    onWaAfterShow: "wa-after-show",
    onWaHide: "wa-hide",
    onWaAfterHide: "wa-after-hide",
    onWaInvalid: "wa-invalid"
  },
  displayName: "WaSelect"
});
var select_default = reactWrapper;

export {
  select_default
};
