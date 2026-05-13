/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  tab_panel_styles_default
} from "./chunk.6GL42UHU.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/tab-panel/tab-panel.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
var id = 0;
var WaTabPanel = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.attrId = ++id;
    this.componentId = `wa-tab-panel-${this.attrId}`;
    this.name = "";
    this.active = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = this.id.length > 0 ? this.id : this.componentId;
    this.setAttribute("role", "tabpanel");
  }
  handleActiveChange() {
    this.setAttribute("aria-hidden", this.active ? "false" : "true");
  }
  render() {
    return html`
      <slot
        part="base"
        class=${classMap({
      "tab-panel": true,
      "tab-panel-active": this.active
    })}
      ></slot>
    `;
  }
};
WaTabPanel.css = tab_panel_styles_default;
__decorateClass([
  property({ reflect: true })
], WaTabPanel.prototype, "name", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTabPanel.prototype, "active", 2);
__decorateClass([
  watch("active")
], WaTabPanel.prototype, "handleActiveChange", 1);
WaTabPanel = __decorateClass([
  customElement("wa-tab-panel")
], WaTabPanel);

export {
  WaTabPanel
};
