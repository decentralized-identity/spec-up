/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  skeleton_styles_default
} from "./chunk.75CPQRLT.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/skeleton/skeleton.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
var WaSkeleton = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.effect = "none";
  }
  render() {
    return html` <div part="indicator" class="indicator"></div> `;
  }
};
WaSkeleton.css = skeleton_styles_default;
__decorateClass([
  property({ reflect: true })
], WaSkeleton.prototype, "effect", 2);
WaSkeleton = __decorateClass([
  customElement("wa-skeleton")
], WaSkeleton);

export {
  WaSkeleton
};
