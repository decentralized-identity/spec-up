/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaHoverEvent
} from "./chunk.BNSYG33H.js";
import {
  rating_styles_default
} from "./chunk.VSJANPDI.js";
import {
  o as o2
} from "./chunk.2BXLTQVW.js";
import {
  clamp
} from "./chunk.VILPAI5J.js";
import {
  size_styles_default
} from "./chunk.7Y5AJDPW.js";
import {
  e as e2
} from "./chunk.KWDPKKFO.js";
import {
  o
} from "./chunk.BQNDCXAL.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  LocalizeController
} from "./chunk.5EW4WF6V.js";
import {
  WebAwesomeElement,
  e,
  n,
  r,
  t,
  t2
} from "./chunk.JB4GDECI.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/rating/rating.ts
var WaRating = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.hoverValue = 0;
    this.isHovering = false;
    this.label = "";
    this.value = 0;
    this.max = 5;
    this.precision = 1;
    this.readonly = false;
    this.disabled = false;
    this.getSymbol = (_value, isSelected) => {
      return isSelected ? '<wa-icon name="star" library="system" variant="solid"></wa-icon>' : '<wa-icon name="star" library="system" variant="regular"></wa-icon>';
    };
    this.size = "medium";
  }
  getValueFromMousePosition(event) {
    return this.getValueFromXCoordinate(event.clientX);
  }
  getValueFromTouchPosition(event) {
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }
  getValueFromXCoordinate(coordinate) {
    const isRtl = this.localize.dir() === "rtl";
    const { left, right, width } = this.rating.getBoundingClientRect();
    const value = isRtl ? this.roundToPrecision((right - coordinate) / width * this.max, this.precision) : this.roundToPrecision((coordinate - left) / width * this.max, this.precision);
    return clamp(value, 0, this.max);
  }
  handleClick(event) {
    if (this.disabled) {
      return;
    }
    this.setValue(this.getValueFromMousePosition(event));
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }
  setValue(newValue) {
    if (this.disabled || this.readonly) {
      return;
    }
    this.value = newValue === this.value ? 0 : newValue;
    this.isHovering = false;
  }
  handleKeyDown(event) {
    const isLtr = this.matches(":dir(ltr)");
    const isRtl = this.localize.dir() === "rtl";
    const oldValue = this.value;
    if (this.disabled || this.readonly) {
      return;
    }
    if (event.key === "ArrowDown" || isLtr && event.key === "ArrowLeft" || isRtl && event.key === "ArrowRight") {
      const decrement = event.shiftKey ? 1 : this.precision;
      this.value = Math.max(0, this.value - decrement);
      event.preventDefault();
    }
    if (event.key === "ArrowUp" || isLtr && event.key === "ArrowRight" || isRtl && event.key === "ArrowLeft") {
      const increment = event.shiftKey ? 1 : this.precision;
      this.value = Math.min(this.max, this.value + increment);
      event.preventDefault();
    }
    if (event.key === "Home") {
      this.value = 0;
      event.preventDefault();
    }
    if (event.key === "End") {
      this.value = this.max;
      event.preventDefault();
    }
    if (this.value !== oldValue) {
      this.updateComplete.then(() => {
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
  }
  handleMouseEnter(event) {
    this.isHovering = true;
    this.hoverValue = this.getValueFromMousePosition(event);
  }
  handleMouseMove(event) {
    this.hoverValue = this.getValueFromMousePosition(event);
  }
  handleMouseLeave() {
    this.isHovering = false;
  }
  handleTouchStart(event) {
    this.isHovering = true;
    this.hoverValue = this.getValueFromTouchPosition(event);
    event.preventDefault();
  }
  handleTouchMove(event) {
    this.hoverValue = this.getValueFromTouchPosition(event);
  }
  handleTouchEnd(event) {
    this.isHovering = false;
    this.setValue(this.hoverValue);
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
    event.preventDefault();
  }
  roundToPrecision(numberToRound, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }
  handleHoverValueChange() {
    this.dispatchEvent(
      new WaHoverEvent({
        phase: "move",
        value: this.hoverValue
      })
    );
  }
  handleIsHoveringChange() {
    this.dispatchEvent(
      new WaHoverEvent({
        phase: this.isHovering ? "start" : "end",
        value: this.hoverValue
      })
    );
  }
  /** Sets focus on the rating. */
  focus(options) {
    this.rating.focus(options);
  }
  /** Removes focus from the rating. */
  blur() {
    this.rating.blur();
  }
  render() {
    const isRtl = this.hasUpdated ? this.localize.dir() === "rtl" : this.dir;
    const counter = Array.from(Array(this.max).keys());
    let displayValue = 0;
    if (this.disabled || this.readonly) {
      displayValue = this.value;
    } else {
      displayValue = this.isHovering ? this.hoverValue : this.value;
    }
    return x`
      <div
        part="base"
        class=${e2({
      rating: true,
      "rating-readonly": this.readonly,
      "rating-disabled": this.disabled
    })}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-readonly=${this.readonly ? "true" : "false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled || this.readonly ? "-1" : "0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="symbols">
          ${counter.map((index) => {
      const isSelected = displayValue >= index + 1;
      if (displayValue > index && displayValue < index + 1) {
        return x`
                <span
                  class=${e2({
          symbol: true,
          "partial-symbol-container": true,
          "symbol-hover": this.isHovering && Math.ceil(displayValue) === index + 1
        })}
                  role="presentation"
                >
                  <div
                    style=${o({
          clipPath: isRtl ? `inset(0 ${(displayValue - index) * 100}% 0 0)` : `inset(0 0 0 ${(displayValue - index) * 100}%)`
        })}
                  >
                    ${o2(this.getSymbol(index + 1, false))}
                  </div>
                  <div
                    class="partial-filled"
                    style=${o({
          clipPath: isRtl ? `inset(0 0 0 ${100 - (displayValue - index) * 100}%)` : `inset(0 ${100 - (displayValue - index) * 100}% 0 0)`
        })}
                  >
                    ${o2(this.getSymbol(index + 1, true))}
                  </div>
                </span>
              `;
      }
      return x`
              <span
                class=${e2({
        symbol: true,
        "symbol-hover": this.isHovering && Math.ceil(displayValue) === index + 1,
        "symbol-active": displayValue >= index + 1
      })}
                role="presentation"
              >
                ${o2(this.getSymbol(index + 1, isSelected))}
              </span>
            `;
    })}
        </span>
      </div>
    `;
  }
};
WaRating.css = [size_styles_default, rating_styles_default];
__decorateClass([
  e(".rating")
], WaRating.prototype, "rating", 2);
__decorateClass([
  r()
], WaRating.prototype, "hoverValue", 2);
__decorateClass([
  r()
], WaRating.prototype, "isHovering", 2);
__decorateClass([
  n()
], WaRating.prototype, "label", 2);
__decorateClass([
  n({ type: Number })
], WaRating.prototype, "value", 2);
__decorateClass([
  n({ type: Number })
], WaRating.prototype, "max", 2);
__decorateClass([
  n({ type: Number })
], WaRating.prototype, "precision", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaRating.prototype, "readonly", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaRating.prototype, "disabled", 2);
__decorateClass([
  n()
], WaRating.prototype, "getSymbol", 2);
__decorateClass([
  n({ reflect: true })
], WaRating.prototype, "size", 2);
__decorateClass([
  t2({ passive: true })
], WaRating.prototype, "handleTouchMove", 1);
__decorateClass([
  watch("hoverValue")
], WaRating.prototype, "handleHoverValueChange", 1);
__decorateClass([
  watch("isHovering")
], WaRating.prototype, "handleIsHoveringChange", 1);
WaRating = __decorateClass([
  t("wa-rating")
], WaRating);

export {
  WaRating
};
