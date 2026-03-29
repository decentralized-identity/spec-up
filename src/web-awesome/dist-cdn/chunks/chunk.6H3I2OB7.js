/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  callout_styles_default
} from "./chunk.45TWT3VE.js";
import {
  size_styles_default
} from "./chunk.7Y5AJDPW.js";
import {
  variants_styles_default
} from "./chunk.SOSPMU23.js";
import {
  WebAwesomeElement,
  n,
  t
} from "./chunk.JB4GDECI.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/callout/callout.ts
var WaCallout = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.variant = "brand";
    this.size = "medium";
  }
  render() {
    return x`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `;
  }
};
WaCallout.css = [callout_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  n({ reflect: true })
], WaCallout.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], WaCallout.prototype, "appearance", 2);
__decorateClass([
  n({ reflect: true })
], WaCallout.prototype, "size", 2);
WaCallout = __decorateClass([
  t("wa-callout")
], WaCallout);

export {
  WaCallout
};
