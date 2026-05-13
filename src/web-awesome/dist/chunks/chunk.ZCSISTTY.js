/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaDialog
} from "./chunk.5CSVOA74.js";

// _bundle_/src/react/dialog/index.ts
import { createComponent } from "@lit/react";
import * as React from "react";
import "@lit/react";
var tagName = "wa-dialog";
var reactWrapper = createComponent({
  tagName,
  elementClass: WaDialog,
  react: React,
  events: {
    onWaShow: "wa-show",
    onWaAfterShow: "wa-after-show",
    onWaHide: "wa-hide",
    onWaAfterHide: "wa-after-hide"
  },
  displayName: "WaDialog"
});
var dialog_default = reactWrapper;

export {
  dialog_default
};
