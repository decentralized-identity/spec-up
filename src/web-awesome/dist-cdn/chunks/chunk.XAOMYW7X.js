/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  toast_item_styles_default
} from "./chunk.V6TXPSQC.js";
import {
  WaShowEvent
} from "./chunk.OCXPLMDW.js";
import {
  WaHideEvent
} from "./chunk.ADZNIDEZ.js";
import {
  WaAfterHideEvent
} from "./chunk.IXFCHTNQ.js";
import {
  WaAfterShowEvent
} from "./chunk.HOKX4ZNE.js";
import {
  animateWithClass
} from "./chunk.ZRLIH7NU.js";
import {
  HasSlotController
} from "./chunk.ROLIHZR6.js";
import {
  size_styles_default
} from "./chunk.7Y5AJDPW.js";
import {
  e as e2
} from "./chunk.KWDPKKFO.js";
import {
  LocalizeController
} from "./chunk.5EW4WF6V.js";
import {
  variants_styles_default
} from "./chunk.SOSPMU23.js";
import {
  WebAwesomeElement,
  e,
  n,
  r,
  t
} from "./chunk.JB4GDECI.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/toast-item/toast-item.ts
var WaToastItem = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "icon");
    this.localize = new LocalizeController(this);
    this.animationFrame = null;
    this.startTime = null;
    this.isHovering = false;
    this.isFocused = false;
    this.timeLeft = 100;
    this.variant = "neutral";
    this.size = "medium";
    this.duration = 5e3;
    this.tick = () => {
      if (!this.startTime) {
        return;
      }
      const elapsed = performance.now() - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      this.timeLeft = 100 * (1 - progress);
      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(this.tick);
      } else {
        this.hide();
      }
    };
    this.handlePointerEnter = (event) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        this.isHovering = true;
        this.pauseTimer();
      }
    };
    this.handlePointerLeave = () => {
      if (this.isHovering) {
        this.isHovering = false;
        this.resumeTimer();
      }
    };
    this.handleFocusIn = () => {
      this.isFocused = true;
      this.pauseTimer();
    };
    this.handleFocusOut = () => {
      this.isFocused = false;
      this.resumeTimer();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("pointerenter", this.handlePointerEnter);
    this.addEventListener("pointerleave", this.handlePointerLeave);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopTimer();
    this.removeEventListener("pointerenter", this.handlePointerEnter);
    this.removeEventListener("pointerleave", this.handlePointerLeave);
  }
  /** @internal Starts the toast item's timer and shows it. Called by the parent toast component. */
  async startTimer() {
    const showEvent = new WaShowEvent();
    this.dispatchEvent(showEvent);
    if (showEvent.defaultPrevented) {
      return;
    }
    await this.updateComplete;
    await animateWithClass(this.toastItemElement, "show");
    this.dispatchEvent(new WaAfterShowEvent());
    if (this.duration > 0 && Number.isFinite(this.duration)) {
      this.startTime = performance.now();
      this.timeLeft = 100;
      this.tick();
    }
  }
  /** @internal Stops the toast item's timer. */
  stopTimer() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
  /** Hides the toast item with animation and removes it from the DOM. */
  async hide() {
    this.stopTimer();
    const hideEvent = new WaHideEvent();
    this.dispatchEvent(hideEvent);
    if (hideEvent.defaultPrevented) {
      return;
    }
    await animateWithClass(this.toastItemElement, "hide");
    this.dispatchEvent(new WaAfterHideEvent());
    this.remove();
  }
  handleCloseClick() {
    this.hide();
  }
  pauseTimer() {
    this.stopTimer();
    this.timeLeft = 100;
  }
  resumeTimer() {
    if (!this.isHovering && !this.isFocused && this.duration > 0) {
      this.startTime = performance.now();
      this.tick();
    }
  }
  render() {
    const hasIcon = this.hasSlotController.test("icon");
    const hasDuration = this.duration > 0;
    return x`
      <div
        part="toast-item"
        class=${e2({
      "toast-item": true,
      "toast-item--has-icon": hasIcon,
      "toast-item--has-duration": hasDuration
    })}
      >
        <div part="accent" class="accent"></div>

        <div part="icon" class="icon">
          <slot name="icon"></slot>
        </div>

        <div part="content" class="content">
          <slot></slot>
        </div>

        <button
          part="close-button"
          class="close-button"
          type="button"
          aria-label=${this.localize.term("close")}
          @click=${this.handleCloseClick}
          @focusin=${this.handleFocusIn}
          @focusout=${this.handleFocusOut}
        >
          <wa-progress-ring
            part="progress-ring"
            exportparts="
              base:progress-ring__base,
              label:progress-ring__label,
              track:progress-ring__track,
              indicator:progress-ring__indicator
            "
            value=${this.timeLeft}
          >
            <wa-icon
              part="close-icon"
              exportparts="svg:close-icon__svg"
              name="xmark"
              library="system"
              variant="solid"
            ></wa-icon>
          </wa-progress-ring>
        </button>
      </div>
    `;
  }
};
WaToastItem.css = [toast_item_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  e(".toast-item")
], WaToastItem.prototype, "toastItemElement", 2);
__decorateClass([
  r()
], WaToastItem.prototype, "timeLeft", 2);
__decorateClass([
  n({ reflect: true })
], WaToastItem.prototype, "variant", 2);
__decorateClass([
  n({ reflect: true })
], WaToastItem.prototype, "size", 2);
__decorateClass([
  n({ type: Number })
], WaToastItem.prototype, "duration", 2);
WaToastItem = __decorateClass([
  t("wa-toast-item")
], WaToastItem);

export {
  WaToastItem
};
