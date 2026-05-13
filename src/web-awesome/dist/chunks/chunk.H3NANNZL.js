/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  card_styles_default
} from "./chunk.VRT3QD64.js";
import {
  HasSlotController
} from "./chunk.ROLIHZR6.js";
import {
  size_styles_default
} from "./chunk.N4OG5GND.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/card/card.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
var WaCard = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(
      this,
      "footer",
      "header",
      "media",
      "header-actions",
      "footer-actions",
      "actions"
    );
    this.appearance = "outlined";
    this.withHeader = false;
    this.withMedia = false;
    this.withFooter = false;
    this.orientation = "vertical";
  }
  updated() {
    if (!this.withHeader && this.hasSlotController.test("header")) this.withHeader = true;
    if (!this.withMedia && this.hasSlotController.test("media")) this.withMedia = true;
    if (!this.withFooter && this.hasSlotController.test("footer")) this.withFooter = true;
  }
  render() {
    if (this.orientation === "horizontal") {
      return html`
        <slot name="media" part="media" class="media"></slot>
        <div part="body" class="body"><slot></slot></div>
        <slot name="actions" part="actions" class="actions"></slot>
      `;
    }
    return html`
      <slot name="media" part="media" class="media"></slot>

      ${this.hasSlotController.test("header-actions") ? html` <header part="header" class="header has-actions">
            <slot name="header"></slot>
            <slot name="header-actions"></slot>
          </header>` : html` <header part="header" class="header">
            <slot name="header"></slot>
          </header>`}

      <div part="body" class="body"><slot></slot></div>
      ${this.hasSlotController.test("footer-actions") ? html` <footer part="footer" class="footer has-actions">
            <slot name="footer"></slot>
            <slot name="footer-actions"></slot>
          </footer>` : html` <footer part="footer" class="footer">
            <slot name="footer"></slot>
          </footer>`}
    `;
  }
};
WaCard.css = [size_styles_default, card_styles_default];
__decorateClass([
  property({ reflect: true })
], WaCard.prototype, "appearance", 2);
__decorateClass([
  property({ attribute: "with-header", type: Boolean, reflect: true })
], WaCard.prototype, "withHeader", 2);
__decorateClass([
  property({ attribute: "with-media", type: Boolean, reflect: true })
], WaCard.prototype, "withMedia", 2);
__decorateClass([
  property({ attribute: "with-footer", type: Boolean, reflect: true })
], WaCard.prototype, "withFooter", 2);
__decorateClass([
  property({ reflect: true })
], WaCard.prototype, "orientation", 2);
WaCard = __decorateClass([
  customElement("wa-card")
], WaCard);

export {
  WaCard
};
