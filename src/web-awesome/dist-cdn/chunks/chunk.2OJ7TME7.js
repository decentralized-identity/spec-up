/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  variants_styles_default
} from "./chunk.SOSPMU23.js";
import {
  WebAwesomeElement,
  n,
  t
} from "./chunk.JB4GDECI.js";
import {
  badge_styles_default
} from "./chunk.UOPLFRRX.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/badge/badge.ts
var WaBadge = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.variant = "brand";
    this.appearance = "accent";
    this.pill = false;
    this.attention = "none";
  }
  render() {
    return x`
      <slot name="start" part="start"></slot>

      <slot part="base" role="status"></slot>

      <slot name="end" part="end"></slot>
    `;
  }
};
WaBadge.css = [variants_styles_default, badge_styles_default];
__decorateClass([
  n({ reflect: true })
], WaBadge.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], WaBadge.prototype, "appearance", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaBadge.prototype, "pill", 2);
__decorateClass([
  n({ reflect: true })
], WaBadge.prototype, "attention", 2);
WaBadge = __decorateClass([
  t("wa-badge")
], WaBadge);

export {
  WaBadge
};
