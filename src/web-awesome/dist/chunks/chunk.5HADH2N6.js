/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  breadcrumb_item_styles_default
} from "./chunk.6NP566QP.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/breadcrumb-item/breadcrumb-item.ts
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
var WaBreadcrumbItem = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.renderType = "button";
    this.rel = "noreferrer noopener";
  }
  setRenderType() {
    const hasDropdown = this.defaultSlot.assignedElements({ flatten: true }).filter((i) => i.tagName.toLowerCase() === "wa-dropdown").length > 0;
    if (this.href) {
      this.renderType = "link";
      return;
    }
    if (hasDropdown) {
      this.renderType = "dropdown";
      return;
    }
    this.renderType = "button";
  }
  hrefChanged() {
    this.setRenderType();
  }
  handleSlotChange() {
    this.setRenderType();
  }
  render() {
    return html`
      <span part="start" class="start">
        <slot name="start"></slot>
      </span>

      ${this.renderType === "link" ? html`
            <a
              part="label"
              class="label label-link"
              href="${this.href}"
              target="${ifDefined(this.target ? this.target : void 0)}"
              rel=${ifDefined(this.target ? this.rel : void 0)}
            >
              <slot></slot>
            </a>
          ` : ""}
      ${this.renderType === "button" ? html`
            <button part="label" type="button" class="label label-button">
              <slot @slotchange=${this.handleSlotChange}></slot>
            </button>
          ` : ""}
      ${this.renderType === "dropdown" ? html`
            <div part="label" class="label label-dropdown">
              <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
          ` : ""}

      <span part="end" class="end">
        <slot name="end"></slot>
      </span>

      <span part="separator" class="separator" aria-hidden="true">
        <slot name="separator"></slot>
      </span>
    `;
  }
};
WaBreadcrumbItem.css = breadcrumb_item_styles_default;
__decorateClass([
  query("slot:not([name])")
], WaBreadcrumbItem.prototype, "defaultSlot", 2);
__decorateClass([
  state()
], WaBreadcrumbItem.prototype, "renderType", 2);
__decorateClass([
  property()
], WaBreadcrumbItem.prototype, "href", 2);
__decorateClass([
  property()
], WaBreadcrumbItem.prototype, "target", 2);
__decorateClass([
  property()
], WaBreadcrumbItem.prototype, "rel", 2);
__decorateClass([
  watch("href", { waitUntilFirstUpdate: true })
], WaBreadcrumbItem.prototype, "hrefChanged", 1);
WaBreadcrumbItem = __decorateClass([
  customElement("wa-breadcrumb-item")
], WaBreadcrumbItem);

export {
  WaBreadcrumbItem
};
