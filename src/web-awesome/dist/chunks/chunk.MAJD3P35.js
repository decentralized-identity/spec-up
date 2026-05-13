/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaAnimation
} from "./chunk.6RSC27C6.js";

// _bundle_/src/react/animation/index.ts
import { createComponent } from "@lit/react";
import * as React from "react";
import "@lit/react";
var tagName = "wa-animation";
var reactWrapper = createComponent({
  tagName,
  elementClass: WaAnimation,
  react: React,
  events: {
    onWaCancel: "wa-cancel",
    onWaFinish: "wa-finish",
    onWaStart: "wa-start"
  },
  displayName: "WaAnimation"
});
var animation_default = reactWrapper;

export {
  animation_default
};
