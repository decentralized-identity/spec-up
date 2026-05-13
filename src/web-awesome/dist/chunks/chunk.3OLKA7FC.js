/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaRepositionEvent
} from "./chunk.HQLDMDWB.js";
import {
  popup_styles_default
} from "./chunk.A5GVVG6J.js";
import {
  LocalizeController
} from "./chunk.OK6DMFIY.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/popup/popup.ts
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  getOverflowAncestors,
  offset,
  platform,
  shift,
  size
} from "@floating-ui/dom";
import { offsetParent } from "composed-offset-position";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
function isVirtualElement(e) {
  return e !== null && typeof e === "object" && "getBoundingClientRect" in e && ("contextElement" in e ? e instanceof Element : true);
}
var SUPPORTS_POPOVER = globalThis?.HTMLElement?.prototype.hasOwnProperty("popover");
var WaPopup = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.active = false;
    this.placement = "top";
    this.boundary = "viewport";
    this.distance = 0;
    this.skidding = 0;
    this.arrow = false;
    this.arrowPlacement = "anchor";
    this.arrowPadding = 10;
    this.flip = false;
    this.flipFallbackPlacements = "";
    this.flipFallbackStrategy = "best-fit";
    this.flipPadding = 0;
    this.shift = false;
    this.shiftPadding = 0;
    this.autoSizePadding = 0;
    this.hoverBridge = false;
    this.updateHoverBridge = () => {
      if (this.hoverBridge && this.anchorEl && this.popup) {
        const anchorRect = this.anchorEl.getBoundingClientRect();
        const popupRect = this.popup.getBoundingClientRect();
        const isVertical = this.placement.includes("top") || this.placement.includes("bottom");
        let topLeftX = 0;
        let topLeftY = 0;
        let topRightX = 0;
        let topRightY = 0;
        let bottomLeftX = 0;
        let bottomLeftY = 0;
        let bottomRightX = 0;
        let bottomRightY = 0;
        if (isVertical) {
          if (anchorRect.top < popupRect.top) {
            topLeftX = anchorRect.left;
            topLeftY = anchorRect.bottom;
            topRightX = anchorRect.right;
            topRightY = anchorRect.bottom;
            bottomLeftX = popupRect.left;
            bottomLeftY = popupRect.top;
            bottomRightX = popupRect.right;
            bottomRightY = popupRect.top;
          } else {
            topLeftX = popupRect.left;
            topLeftY = popupRect.bottom;
            topRightX = popupRect.right;
            topRightY = popupRect.bottom;
            bottomLeftX = anchorRect.left;
            bottomLeftY = anchorRect.top;
            bottomRightX = anchorRect.right;
            bottomRightY = anchorRect.top;
          }
        } else {
          if (anchorRect.left < popupRect.left) {
            topLeftX = anchorRect.right;
            topLeftY = anchorRect.top;
            topRightX = popupRect.left;
            topRightY = popupRect.top;
            bottomLeftX = anchorRect.right;
            bottomLeftY = anchorRect.bottom;
            bottomRightX = popupRect.left;
            bottomRightY = popupRect.bottom;
          } else {
            topLeftX = popupRect.right;
            topLeftY = popupRect.top;
            topRightX = anchorRect.left;
            topRightY = anchorRect.top;
            bottomLeftX = popupRect.right;
            bottomLeftY = popupRect.bottom;
            bottomRightX = anchorRect.left;
            bottomRightY = anchorRect.bottom;
          }
        }
        this.style.setProperty("--hover-bridge-top-left-x", `${topLeftX}px`);
        this.style.setProperty("--hover-bridge-top-left-y", `${topLeftY}px`);
        this.style.setProperty("--hover-bridge-top-right-x", `${topRightX}px`);
        this.style.setProperty("--hover-bridge-top-right-y", `${topRightY}px`);
        this.style.setProperty("--hover-bridge-bottom-left-x", `${bottomLeftX}px`);
        this.style.setProperty("--hover-bridge-bottom-left-y", `${bottomLeftY}px`);
        this.style.setProperty("--hover-bridge-bottom-right-x", `${bottomRightX}px`);
        this.style.setProperty("--hover-bridge-bottom-right-y", `${bottomRightY}px`);
      }
    };
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }
  async updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("active")) {
      if (this.active) {
        this.start();
      } else {
        this.stop();
      }
    }
    if (changedProperties.has("anchor")) {
      this.handleAnchorChange();
    }
    if (this.active) {
      await this.updateComplete;
      this.reposition();
    }
  }
  async handleAnchorChange() {
    await this.stop();
    if (this.anchor && typeof this.anchor === "string") {
      const root = this.getRootNode();
      this.anchorEl = root.getElementById(this.anchor);
    } else if (this.anchor instanceof Element || isVirtualElement(this.anchor)) {
      this.anchorEl = this.anchor;
    } else {
      this.anchorEl = this.querySelector('[slot="anchor"]');
    }
    if (this.anchorEl instanceof HTMLSlotElement) {
      this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
    }
    if (this.anchorEl) {
      this.start();
    }
  }
  start() {
    if (!this.anchorEl || !this.active || !this.isConnected) {
      return;
    }
    this.popup?.showPopover?.();
    this.cleanup = autoUpdate(this.anchorEl, this.popup, () => {
      this.reposition();
    });
  }
  async stop() {
    return new Promise((resolve) => {
      this.popup?.hidePopover?.();
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = void 0;
        this.removeAttribute("data-current-placement");
        this.style.removeProperty("--auto-size-available-width");
        this.style.removeProperty("--auto-size-available-height");
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }
  /** Forces the popup to recalculate and reposition itself. */
  reposition() {
    if (!this.active || !this.anchorEl || !this.popup) {
      return;
    }
    const middleware = [
      // The offset middleware goes first
      offset({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    if (this.sync) {
      middleware.push(
        size({
          apply: ({ rects }) => {
            const syncWidth = this.sync === "width" || this.sync === "both";
            const syncHeight = this.sync === "height" || this.sync === "both";
            this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
            this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
          }
        })
      );
    } else {
      this.popup.style.width = "";
      this.popup.style.height = "";
    }
    let defaultBoundary;
    if (SUPPORTS_POPOVER && !isVirtualElement(this.anchor) && this.boundary === "scroll") {
      defaultBoundary = getOverflowAncestors(this.anchorEl).filter((el) => el instanceof Element);
    }
    if (this.flip) {
      middleware.push(
        flip({
          boundary: this.flipBoundary || defaultBoundary,
          // @ts-expect-error - We're converting a string attribute to an array here
          fallbackPlacements: this.flipFallbackPlacements,
          fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
          padding: this.flipPadding
        })
      );
    }
    if (this.shift) {
      middleware.push(
        shift({
          boundary: this.shiftBoundary || defaultBoundary,
          padding: this.shiftPadding
        })
      );
    }
    if (this.autoSize) {
      middleware.push(
        size({
          boundary: this.autoSizeBoundary || defaultBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            if (this.autoSize === "vertical" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
            } else {
              this.style.removeProperty("--auto-size-available-height");
            }
            if (this.autoSize === "horizontal" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
            } else {
              this.style.removeProperty("--auto-size-available-width");
            }
          }
        })
      );
    } else {
      this.style.removeProperty("--auto-size-available-width");
      this.style.removeProperty("--auto-size-available-height");
    }
    if (this.arrow) {
      middleware.push(
        arrow({
          element: this.arrowEl,
          padding: this.arrowPadding
        })
      );
    }
    const getOffsetParent = SUPPORTS_POPOVER ? (element) => platform.getOffsetParent(element, offsetParent) : platform.getOffsetParent;
    computePosition(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware,
      strategy: SUPPORTS_POPOVER ? "absolute" : "fixed",
      platform: {
        ...platform,
        getOffsetParent
      }
    }).then(({ x, y, middlewareData, placement }) => {
      const isRtl = this.localize.dir() === "rtl";
      const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
      this.setAttribute("data-current-placement", placement);
      Object.assign(this.popup.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      if (this.arrow) {
        const arrowX = middlewareData.arrow.x;
        const arrowY = middlewareData.arrow.y;
        let top = "";
        let right = "";
        let bottom = "";
        let left = "";
        if (this.arrowPlacement === "start") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? value : "";
          left = isRtl ? "" : value;
        } else if (this.arrowPlacement === "end") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? "" : value;
          left = isRtl ? value : "";
          bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else if (this.arrowPlacement === "center") {
          left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
          top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
        } else {
          left = typeof arrowX === "number" ? `${arrowX}px` : "";
          top = typeof arrowY === "number" ? `${arrowY}px` : "";
        }
        Object.assign(this.arrowEl.style, {
          top,
          right,
          bottom,
          left,
          [staticSide]: "calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"
        });
      }
    });
    requestAnimationFrame(() => this.updateHoverBridge());
    this.dispatchEvent(new WaRepositionEvent());
  }
  render() {
    return html`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${classMap({
      "popup-hover-bridge": true,
      "popup-hover-bridge-visible": this.hoverBridge && this.active
    })}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${classMap({
      popup: true,
      "popup-active": this.active,
      "popup-fixed": !SUPPORTS_POPOVER,
      "popup-has-arrow": this.arrow
    })}
      >
        <slot></slot>
        ${this.arrow ? html`<div part="arrow" class="arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
WaPopup.css = popup_styles_default;
__decorateClass([
  query(".popup")
], WaPopup.prototype, "popup", 2);
__decorateClass([
  query(".arrow")
], WaPopup.prototype, "arrowEl", 2);
__decorateClass([
  property()
], WaPopup.prototype, "anchor", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaPopup.prototype, "active", 2);
__decorateClass([
  property({ reflect: true })
], WaPopup.prototype, "placement", 2);
__decorateClass([
  property()
], WaPopup.prototype, "boundary", 2);
__decorateClass([
  property({ type: Number })
], WaPopup.prototype, "distance", 2);
__decorateClass([
  property({ type: Number })
], WaPopup.prototype, "skidding", 2);
__decorateClass([
  property({ type: Boolean })
], WaPopup.prototype, "arrow", 2);
__decorateClass([
  property({ attribute: "arrow-placement" })
], WaPopup.prototype, "arrowPlacement", 2);
__decorateClass([
  property({ attribute: "arrow-padding", type: Number })
], WaPopup.prototype, "arrowPadding", 2);
__decorateClass([
  property({ type: Boolean })
], WaPopup.prototype, "flip", 2);
__decorateClass([
  property({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (value) => {
        return value.split(" ").map((p) => p.trim()).filter((p) => p !== "");
      },
      toAttribute: (value) => {
        return value.join(" ");
      }
    }
  })
], WaPopup.prototype, "flipFallbackPlacements", 2);
__decorateClass([
  property({ attribute: "flip-fallback-strategy" })
], WaPopup.prototype, "flipFallbackStrategy", 2);
__decorateClass([
  property({ type: Object })
], WaPopup.prototype, "flipBoundary", 2);
__decorateClass([
  property({ attribute: "flip-padding", type: Number })
], WaPopup.prototype, "flipPadding", 2);
__decorateClass([
  property({ type: Boolean })
], WaPopup.prototype, "shift", 2);
__decorateClass([
  property({ type: Object })
], WaPopup.prototype, "shiftBoundary", 2);
__decorateClass([
  property({ attribute: "shift-padding", type: Number })
], WaPopup.prototype, "shiftPadding", 2);
__decorateClass([
  property({ attribute: "auto-size" })
], WaPopup.prototype, "autoSize", 2);
__decorateClass([
  property()
], WaPopup.prototype, "sync", 2);
__decorateClass([
  property({ type: Object })
], WaPopup.prototype, "autoSizeBoundary", 2);
__decorateClass([
  property({ attribute: "auto-size-padding", type: Number })
], WaPopup.prototype, "autoSizePadding", 2);
__decorateClass([
  property({ attribute: "hover-bridge", type: Boolean })
], WaPopup.prototype, "hoverBridge", 2);
WaPopup = __decorateClass([
  customElement("wa-popup")
], WaPopup);

export {
  WaPopup
};
