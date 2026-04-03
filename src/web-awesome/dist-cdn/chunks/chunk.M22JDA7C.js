/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  toast_styles_default
} from "./chunk.JTKZHZD7.js";
import {
  animate,
  prefersReducedMotion
} from "./chunk.ZRLIH7NU.js";
import {
  WebAwesomeElement,
  e,
  n,
  t
} from "./chunk.JB4GDECI.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/toast/toast.ts
var WaToast = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.activatedToastItems = /* @__PURE__ */ new WeakSet();
    this.positionCache = /* @__PURE__ */ new Map();
    this.placement = "top-end";
    this.handleDocumentKeyDown = async (event) => {
      await new Promise((resolve) => setTimeout(resolve));
      if (event.key === "Escape" && !event.defaultPrevented) {
        const toastItems = this.getToastItems();
        if (toastItems.length > 0) {
          event.preventDefault();
          const mostRecent = toastItems[toastItems.length - 1];
          mostRecent?.hide();
        }
      }
    };
    this.handleAfterHide = async (event) => {
      const toastItem = event.target;
      if (toastItem.parentElement === this) {
        this.capturePositions();
        toastItem.remove();
        await this.animatePositions();
      }
      if (this.getToastItems().length === 0) {
        this.hideStack();
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.popover = "manual";
    this.role = "log";
    this.ariaLive = "polite";
    this.ariaRelevant = "additions";
    document.addEventListener("keydown", this.handleDocumentKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  handleSlotChange() {
    const toastItems = this.getToastItems();
    const newItems = [];
    toastItems.forEach((toastItem) => {
      if (!this.activatedToastItems.has(toastItem)) {
        newItems.push(toastItem);
      }
    });
    if (newItems.length > 0) {
      this.capturePositions();
      newItems.forEach((toastItem) => {
        this.activatedToastItems.add(toastItem);
        this.showStack();
        toastItem.startTimer();
      });
      requestAnimationFrame(() => this.animatePositions());
    }
  }
  getToastItems() {
    return [...this.querySelectorAll(":scope > wa-toast-item")];
  }
  /** Captures the current position of all toast items for FLIP animation. */
  capturePositions() {
    this.positionCache.clear();
    for (const item of this.getToastItems()) {
      this.positionCache.set(item, item.getBoundingClientRect());
    }
  }
  /** Animates toast items from their cached positions to their new positions using FLIP. */
  async animatePositions() {
    if (prefersReducedMotion()) {
      this.positionCache.clear();
      return;
    }
    const animations = [];
    for (const item of this.getToastItems()) {
      const oldRect = this.positionCache.get(item);
      if (!oldRect) continue;
      const newRect = item.getBoundingClientRect();
      const deltaY = oldRect.top - newRect.top;
      if (Math.abs(deltaY) > 1) {
        const animation = animate(item, [{ transform: `translateY(${deltaY}px)` }, { transform: "translateY(0)" }], {
          duration: 200,
          easing: "cubic-bezier(0.2, 0, 0, 1)"
          // Material Design standard easing
        });
        animations.push(animation);
      }
    }
    this.positionCache.clear();
    await Promise.all(animations);
  }
  showStack() {
    if (!this.matches(":popover-open")) {
      this.showPopover();
      this.customStates.set("visible", true);
    }
  }
  hideStack() {
    if (this.matches(":popover-open")) {
      this.hidePopover();
      this.customStates.set("visible", false);
    }
  }
  /**
   * Creates a toast notification programmatically and adds it to the stack. Returns a reference to the created toast
   * item element.
   */
  async create(message, options) {
    const opts = {
      allowHtml: false,
      duration: 5e3,
      variant: "neutral",
      size: "medium",
      ...options
    };
    const toastItem = document.createElement("wa-toast-item");
    toastItem.variant = opts.variant;
    toastItem.size = opts.size;
    toastItem.duration = opts.duration;
    if (opts.allowHtml) {
      toastItem.innerHTML = message;
    } else {
      toastItem.textContent = message;
    }
    if (opts.icon) {
      const icon = document.createElement("wa-icon");
      icon.setAttribute("slot", "icon");
      if (typeof opts.icon === "string") {
        icon.setAttribute("name", opts.icon);
      } else {
        icon.setAttribute("name", opts.icon.name);
        if (opts.icon.library) {
          icon.setAttribute("library", opts.icon.library);
        }
        if (opts.icon.family) {
          icon.setAttribute("family", opts.icon.family);
        }
        if (opts.icon.variant) {
          icon.setAttribute("variant", opts.icon.variant);
        }
      }
      toastItem.prepend(icon);
    }
    this.activatedToastItems.add(toastItem);
    this.capturePositions();
    this.showStack();
    this.prepend(toastItem);
    await toastItem.updateComplete;
    this.animatePositions();
    toastItem.startTimer();
    return toastItem;
  }
  render() {
    return x`
      <div part="stack" class="stack" @wa-after-hide=${this.handleAfterHide}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
};
WaToast.css = toast_styles_default;
__decorateClass([
  e(".stack")
], WaToast.prototype, "stack", 2);
__decorateClass([
  n({ reflect: true })
], WaToast.prototype, "placement", 2);
WaToast = __decorateClass([
  t("wa-toast")
], WaToast);

export {
  WaToast
};
