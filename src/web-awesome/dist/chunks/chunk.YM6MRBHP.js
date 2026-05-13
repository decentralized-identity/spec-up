/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaIntersectEvent
} from "./chunk.SD3O7YX6.js";
import {
  intersection_observer_styles_default
} from "./chunk.NIB5UTS2.js";
import {
  parseSpaceDelimitedTokens
} from "./chunk.TW3VXPTP.js";
import {
  clamp
} from "./chunk.4SJJHQXE.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/intersection-observer/intersection-observer.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
var WaIntersectionObserver = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.intersectionObserver = null;
    this.observedElements = /* @__PURE__ */ new Map();
    this.root = null;
    this.rootMargin = "0px";
    this.threshold = "0";
    this.intersectClass = "";
    this.once = false;
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
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
  /** Converts threshold property string into numeric array. */
  parseThreshold() {
    const tokens = parseSpaceDelimitedTokens(this.threshold);
    return tokens.map((token) => {
      const num = parseFloat(token);
      return isNaN(num) ? 0 : clamp(num, 0, 1);
    });
  }
  /** Locates and returns the root element using the specified ID. */
  resolveRoot() {
    if (!this.root) return null;
    try {
      const doc = this.getRootNode();
      const target = doc.getElementById(this.root);
      if (!target) {
        console.warn(`Root element with ID "${this.root}" could not be found.`, this);
      }
      return target;
    } catch {
      console.warn(`Invalid selector for root: "${this.root}"`, this);
      return null;
    }
  }
  /** Initializes or reinitializes the intersection observer instance. */
  startObserver() {
    this.stopObserver();
    if (this.disabled) return;
    const threshold = this.parseThreshold();
    const rootElement = this.resolveRoot();
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasIntersecting = this.observedElements.get(entry.target) ?? false;
          const isIntersecting = entry.isIntersecting;
          this.observedElements.set(entry.target, isIntersecting);
          if (this.intersectClass) {
            if (isIntersecting) {
              entry.target.classList.add(this.intersectClass);
            } else {
              entry.target.classList.remove(this.intersectClass);
            }
          }
          const changeEvent = new WaIntersectEvent({ entry });
          this.dispatchEvent(changeEvent);
          if (isIntersecting && !wasIntersecting) {
            if (this.once) {
              this.intersectionObserver?.unobserve(entry.target);
              this.observedElements.delete(entry.target);
            }
          }
        });
      },
      {
        root: rootElement,
        rootMargin: this.rootMargin,
        threshold
      }
    );
    const slot = this.shadowRoot.querySelector("slot");
    if (slot !== null) {
      const elements = slot.assignedElements({ flatten: true });
      elements.forEach((element) => {
        this.intersectionObserver?.observe(element);
        this.observedElements.set(element, false);
      });
    }
  }
  /** Halts the intersection observer and cleans up. */
  stopObserver() {
    if (this.intersectClass) {
      this.observedElements.forEach((_, element) => {
        element.classList.remove(this.intersectClass);
      });
    }
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    this.observedElements.clear();
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }
  handleOptionsChange() {
    this.startObserver();
  }
  render() {
    return html` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
};
WaIntersectionObserver.css = intersection_observer_styles_default;
__decorateClass([
  property()
], WaIntersectionObserver.prototype, "root", 2);
__decorateClass([
  property({ attribute: "root-margin" })
], WaIntersectionObserver.prototype, "rootMargin", 2);
__decorateClass([
  property()
], WaIntersectionObserver.prototype, "threshold", 2);
__decorateClass([
  property({ attribute: "intersect-class" })
], WaIntersectionObserver.prototype, "intersectClass", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaIntersectionObserver.prototype, "once", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaIntersectionObserver.prototype, "disabled", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], WaIntersectionObserver.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("root", { waitUntilFirstUpdate: true }),
  watch("rootMargin", { waitUntilFirstUpdate: true }),
  watch("threshold", { waitUntilFirstUpdate: true })
], WaIntersectionObserver.prototype, "handleOptionsChange", 1);
WaIntersectionObserver = __decorateClass([
  customElement("wa-intersection-observer")
], WaIntersectionObserver);

export {
  WaIntersectionObserver
};
