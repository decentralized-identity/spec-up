/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaRemoveEvent
} from "./chunk.M2YXIHNH.js";
import {
  tag_styles_default
} from "./chunk.XGZ6HLMO.js";
import {
  size_styles_default
} from "./chunk.N4OG5GND.js";
import {
  LocalizeController
} from "./chunk.OK6DMFIY.js";
import {
  variants_styles_default
} from "./chunk.MFAIEGTH.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/tag/tag.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
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
    return html`
      <slot part="content" class="content"></slot>

      ${this.withRemove ? html`
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
  property({ reflect: true })
], WaTag.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], WaTag.prototype, "appearance", 2);
__decorateClass([
  property({ reflect: true })
], WaTag.prototype, "size", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTag.prototype, "pill", 2);
__decorateClass([
  property({ attribute: "with-remove", type: Boolean })
], WaTag.prototype, "withRemove", 2);
WaTag = __decorateClass([
  customElement("wa-tag")
], WaTag);

export {
  WaTag
};
