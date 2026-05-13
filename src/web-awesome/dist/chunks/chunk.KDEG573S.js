/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  variants_styles_default
} from "./chunk.MFAIEGTH.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  badge_styles_default
} from "./chunk.S7JYD6VT.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/badge/badge.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
var WaBadge = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.variant = "brand";
    this.appearance = "accent";
    this.pill = false;
    this.attention = "none";
  }
  render() {
    return html`
      <slot name="start" part="start"></slot>

      <slot part="base" role="status"></slot>

      <slot name="end" part="end"></slot>
    `;
  }
};
WaBadge.css = [variants_styles_default, badge_styles_default];
__decorateClass([
  property({ reflect: true })
], WaBadge.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], WaBadge.prototype, "appearance", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaBadge.prototype, "pill", 2);
__decorateClass([
  property({ reflect: true })
], WaBadge.prototype, "attention", 2);
WaBadge = __decorateClass([
  customElement("wa-badge")
], WaBadge);

export {
  WaBadge
};
