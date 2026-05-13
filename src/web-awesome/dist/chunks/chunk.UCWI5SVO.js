/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  tab_styles_default
} from "./chunk.RAHK3WM5.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/tab/tab.ts
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
var id = 0;
var WaTab = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.attrId = ++id;
    this.componentId = `wa-tab-${this.attrId}`;
    this.panel = "";
    this.active = false;
    this.disabled = false;
    this.tabIndex = 0;
  }
  connectedCallback() {
    this.slot || (this.slot = "nav");
    super.connectedCallback();
    this.setAttribute("role", "tab");
  }
  handleActiveChange() {
    this.setAttribute("aria-selected", this.active ? "true" : "false");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    if (this.disabled && !this.active) {
      this.tabIndex = -1;
    } else {
      this.tabIndex = 0;
    }
  }
  render() {
    this.id = this.id?.length > 0 ? this.id : this.componentId;
    return html`
      <div
        part="base"
        class=${classMap({
      tab: true,
      "tab-active": this.active
    })}
      >
        <slot></slot>
      </div>
    `;
  }
};
WaTab.css = tab_styles_default;
__decorateClass([
  query(".tab")
], WaTab.prototype, "tab", 2);
__decorateClass([
  property({ reflect: true })
], WaTab.prototype, "panel", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTab.prototype, "active", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTab.prototype, "disabled", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], WaTab.prototype, "tabIndex", 2);
__decorateClass([
  watch("active")
], WaTab.prototype, "handleActiveChange", 1);
__decorateClass([
  watch("disabled")
], WaTab.prototype, "handleDisabledChange", 1);
WaTab = __decorateClass([
  customElement("wa-tab")
], WaTab);

export {
  WaTab
};
