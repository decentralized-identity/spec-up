/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaRemoveEvent
} from "./chunk.M2YXIHNH.js";
import {
  tag_styles_default
} from "./chunk.XKO2HXER.js";
import {
  size_styles_default
} from "./chunk.7Y5AJDPW.js";
import {
  LocalizeController
} from "./chunk.5EW4WF6V.js";
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

// _bundle_/src/components/tag/tag.ts
var WaTag = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.variant = "neutral";
    this.appearance = "filled-outlined";
    this.size = "medium";
    this.pill = false;
    this.withRemove = false;
  }
  handleRemoveClick() {
    this.dispatchEvent(new WaRemoveEvent());
  }
  render() {
    return x`
      <slot part="content" class="content"></slot>

      ${this.withRemove ? x`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          ` : ""}
    `;
  }
};
WaTag.css = [tag_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  n({ reflect: true })
], WaTag.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], WaTag.prototype, "appearance", 2);
__decorateClass([
  n({ reflect: true })
], WaTag.prototype, "size", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaTag.prototype, "pill", 2);
__decorateClass([
  n({ attribute: "with-remove", type: Boolean })
], WaTag.prototype, "withRemove", 2);
WaTag = __decorateClass([
  t("wa-tag")
], WaTag);

export {
  WaTag
};
