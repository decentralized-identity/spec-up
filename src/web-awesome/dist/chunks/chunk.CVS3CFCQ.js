/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaResizeEvent
} from "./chunk.DFBAIPT4.js";
import {
  resize_observer_styles_default
} from "./chunk.OMSPAXUI.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/resize-observer/resize-observer.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
var WaResizeObserver = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.observedElements = [];
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver((entries) => {
      this.dispatchEvent(new WaResizeEvent({ entries }));
    });
    if (!this.disabled) {
      this.updateComplete.then(() => {
        this.startObserver();
      });
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopObserver();
  }
  handleSlotChange() {
    if (!this.disabled) {
      this.startObserver();
    }
  }
  startObserver() {
    const slot = this.shadowRoot.querySelector("slot");
    if (slot !== null) {
      const elements = slot.assignedElements({ flatten: true });
      this.observedElements.forEach((el) => this.resizeObserver.unobserve(el));
      this.observedElements = [];
      elements.forEach((el) => {
        this.resizeObserver.observe(el);
        this.observedElements.push(el);
      });
    }
  }
  stopObserver() {
    this.resizeObserver.disconnect();
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }
  render() {
    return html` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
};
WaResizeObserver.css = resize_observer_styles_default;
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaResizeObserver.prototype, "disabled", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], WaResizeObserver.prototype, "handleDisabledChange", 1);
WaResizeObserver = __decorateClass([
  customElement("wa-resize-observer")
], WaResizeObserver);

export {
  WaResizeObserver
};
