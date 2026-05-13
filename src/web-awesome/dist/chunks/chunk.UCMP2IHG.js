/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  drag
} from "./chunk.FTQL6MVS.js";
import {
  visually_hidden_styles_default
} from "./chunk.G43BFAJO.js";
import {
  isTopDismissible,
  registerDismissible,
  unregisterDismissible
} from "./chunk.EXBMUNXF.js";
import {
  RequiredValidator
} from "./chunk.JPXNJ5XW.js";
import {
  form_control_styles_default
} from "./chunk.KTP2IKLN.js";
import {
  color_picker_styles_default
} from "./chunk.MCGY3W6P.js";
import {
  clamp
} from "./chunk.4SJJHQXE.js";
import {
  waitForEvent
} from "./chunk.572W6XBT.js";
import {
  animateWithClass
} from "./chunk.ZRLIH7NU.js";
import {
  WebAwesomeFormAssociatedElement
} from "./chunk.GGEKIAF3.js";
import {
  WaInvalidEvent
} from "./chunk.S7GU24DN.js";
import {
  HasSlotController
} from "./chunk.ROLIHZR6.js";
import {
  size_styles_default
} from "./chunk.N4OG5GND.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  LocalizeController
} from "./chunk.OK6DMFIY.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/color-picker/color-picker.ts
import { TinyColor } from "@ctrl/tinycolor";
import { html, isServer } from "lit";
import { customElement, eventOptions, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
var WaColorPicker = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super();
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.isSafeValue = false;
    this.localize = new LocalizeController(this);
    this.hasFocus = false;
    this.isDraggingGridHandle = false;
    this.isEmpty = true;
    this.inputValue = "";
    this.hue = 0;
    this.saturation = 100;
    this.brightness = 100;
    this.alpha = 100;
    this._value = null;
    this.defaultValue = this.getAttribute("value") || null;
    this.withLabel = false;
    this.withHint = false;
    this.hasEyeDropper = false;
    this.label = "";
    this.hint = "";
    this.format = "hex";
    this.size = "medium";
    this.withoutFormatToggle = false;
    this.name = null;
    this.disabled = false;
    this.open = false;
    this.opacity = false;
    this.uppercase = false;
    this.swatches = "";
    this.required = false;
    this.handleFocusIn = () => {
      this.hasFocus = true;
    };
    this.handleFocusOut = () => {
      this.hasFocus = false;
    };
    this.reportValidityAfterShow = () => {
      this.removeEventListener("invalid", this.emitInvalid);
      this.reportValidity();
      this.addEventListener("invalid", this.emitInvalid);
    };
    this.handleKeyDown = (event) => {
      if (this.open && event.key === "Escape" && isTopDismissible(this)) {
        event.stopPropagation();
        this.hide();
        this.focus();
      }
    };
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.stopPropagation();
        this.focus();
        this.hide();
        return;
      }
      if (event.key === "Tab") {
        setTimeout(() => {
          const activeElement = this.getRootNode() instanceof ShadowRoot ? document.activeElement?.shadowRoot?.activeElement : document.activeElement;
          if (!this || activeElement?.closest(this.tagName.toLowerCase()) !== this) {
            this.hide();
          }
        });
      }
    };
    this.handleDocumentMouseDown = (event) => {
      const path = event.composedPath();
      const isInsideRelevantArea = path.some(
        (element) => element instanceof Element && (element.closest(".color-picker") || element === this.trigger)
      );
      if (this && !isInsideRelevantArea) {
        this.hide();
      }
    };
    if (!isServer) {
      this.addEventListener("focusin", this.handleFocusIn);
      this.addEventListener("focusout", this.handleFocusOut);
    }
  }
  static get validators() {
    const validators = isServer ? [] : [RequiredValidator()];
    return [...super.validators, ...validators];
  }
  // @TODO: This is a hacky way to show the "Please fill out this field", do we want the old behavior where it opens the dropdown?
  //   or is the new behavior okay?
  get validationTarget() {
    if (this.popup?.active) {
      return this.input;
    }
    return this.trigger;
  }
  /** The current value of the input, submitted as a name/value pair with form data. */
  get value() {
    if (this.valueHasChanged) {
      return this._value;
    }
    return this._value ?? this.defaultValue;
  }
  set value(val) {
    if (this._value === val) {
      return;
    }
    this.valueHasChanged = true;
    this._value = val;
  }
  handleCopy() {
    this.input.select();
    document.execCommand("copy");
    this.previewButton.focus();
    this.previewButton.classList.add("preview-color-copied");
    this.previewButton.addEventListener("animationend", () => {
      this.previewButton.classList.remove("preview-color-copied");
    });
  }
  handleFormatToggle() {
    const formats = ["hex", "rgb", "hsl", "hsv"];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex];
    this.setColor(this.value || "");
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    });
  }
  handleAlphaDrag(event) {
    const container = this.shadowRoot.querySelector(".slider.alpha");
    const handle = container.querySelector(".slider-handle");
    const { width } = container.getBoundingClientRect();
    let initialValue = this.value;
    let currentValue = this.value;
    handle.focus();
    event.preventDefault();
    drag(container, {
      onMove: (x) => {
        this.alpha = clamp(x / width * 100, 0, 100);
        this.syncValues();
        if (this.value !== currentValue) {
          currentValue = this.value;
          this.updateComplete.then(() => {
            this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
          });
        }
      },
      onStop: () => {
        if (this.value !== initialValue) {
          initialValue = this.value;
          this.updateComplete.then(() => {
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
          });
        }
      },
      initialEvent: event
    });
  }
  handleHueDrag(event) {
    const container = this.shadowRoot.querySelector(".slider.hue");
    const handle = container.querySelector(".slider-handle");
    const { width } = container.getBoundingClientRect();
    let initialValue = this.value;
    let currentValue = this.value;
    handle.focus();
    event.preventDefault();
    drag(container, {
      onMove: (x) => {
        this.hue = clamp(x / width * 360, 0, 360);
        this.syncValues();
        if (this.value !== currentValue) {
          currentValue = this.value;
          this.updateComplete.then(() => {
            this.dispatchEvent(new InputEvent("input"));
          });
        }
      },
      onStop: () => {
        if (this.value !== initialValue) {
          initialValue = this.value;
          this.updateComplete.then(() => {
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
          });
        }
      },
      initialEvent: event
    });
  }
  handleGridDrag(event) {
    const grid = this.shadowRoot.querySelector(".grid");
    const handle = grid.querySelector(".grid-handle");
    const { width, height } = grid.getBoundingClientRect();
    let initialValue = this.value;
    let currentValue = this.value;
    handle.focus();
    event.preventDefault();
    this.isDraggingGridHandle = true;
    drag(grid, {
      onMove: (x, y) => {
        this.saturation = clamp(x / width * 100, 0, 100);
        this.brightness = clamp(100 - y / height * 100, 0, 100);
        this.syncValues();
        if (this.value !== currentValue) {
          currentValue = this.value;
          this.updateComplete.then(() => {
            this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
          });
        }
      },
      onStop: () => {
        this.isDraggingGridHandle = false;
        if (this.value !== initialValue) {
          initialValue = this.value;
          this.updateComplete.then(() => {
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
          });
        }
      },
      initialEvent: event
    });
  }
  handleAlphaKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.alpha = clamp(this.alpha - increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.alpha = clamp(this.alpha + increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "Home") {
      event.preventDefault();
      this.alpha = 0;
      this.syncValues();
    }
    if (event.key === "End") {
      event.preventDefault();
      this.alpha = 100;
      this.syncValues();
    }
    if (this.value !== oldValue) {
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
  }
  handleHueKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.hue = clamp(this.hue - increment, 0, 360);
      this.syncValues();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.hue = clamp(this.hue + increment, 0, 360);
      this.syncValues();
    }
    if (event.key === "Home") {
      event.preventDefault();
      this.hue = 0;
      this.syncValues();
    }
    if (event.key === "End") {
      event.preventDefault();
      this.hue = 360;
      this.syncValues();
    }
    if (this.value !== oldValue) {
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
  }
  handleGridKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.saturation = clamp(this.saturation - increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.saturation = clamp(this.saturation + increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.brightness = clamp(this.brightness + increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.brightness = clamp(this.brightness - increment, 0, 100);
      this.syncValues();
    }
    if (this.value !== oldValue) {
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
  }
  handleInputChange(event) {
    const target = event.target;
    const oldValue = this.value;
    event.stopPropagation();
    if (this.input.value) {
      this.setColor(target.value);
      target.value = this.value || "";
    } else {
      this.value = "";
    }
    if (this.value !== oldValue) {
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
  }
  handleInputInput(event) {
    this.updateValidity();
    event.stopPropagation();
  }
  handleInputKeyDown(event) {
    if (event.key === "Enter") {
      const oldValue = this.value;
      if (this.input.value) {
        this.setColor(this.input.value);
        this.input.value = this.value;
        if (this.value !== oldValue) {
          this.updateComplete.then(() => {
            this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
          });
        }
        setTimeout(() => this.input.select());
      } else {
        this.hue = 0;
      }
    }
  }
  handleTouchMove(event) {
    event.preventDefault();
  }
  parseColor(colorString) {
    if (!colorString || colorString.trim() === "") {
      return null;
    }
    const color = new TinyColor(colorString);
    if (!color.isValid) {
      return null;
    }
    const hslColor = color.toHsl();
    const rgb = color.toRgb();
    const hsvColor = color.toHsv();
    if (!rgb || rgb.r == null || rgb.g == null || rgb.b == null) {
      return null;
    }
    const hsl = {
      h: hslColor.h || 0,
      s: (hslColor.s || 0) * 100,
      l: (hslColor.l || 0) * 100,
      a: hslColor.a || 0
    };
    const hex = color.toHexString();
    const hexa = color.toHex8String();
    const hsv = {
      h: hsvColor.h || 0,
      s: (hsvColor.s || 0) * 100,
      v: (hsvColor.v || 0) * 100,
      a: hsvColor.a || 0
    };
    return {
      hsl: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        string: this.setLetterCase(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`)
      },
      hsla: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        string: this.setLetterCase(
          `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${hsl.a.toFixed(2).toString()})`
        )
      },
      hsv: {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v,
        string: this.setLetterCase(`hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)`)
      },
      hsva: {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v,
        a: hsv.a,
        string: this.setLetterCase(
          `hsva(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%, ${hsv.a.toFixed(2).toString()})`
        )
      },
      rgb: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        string: this.setLetterCase(`rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`)
      },
      rgba: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: rgb.a || 0,
        string: this.setLetterCase(
          `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${(rgb.a || 0).toFixed(2).toString()})`
        )
      },
      hex: this.setLetterCase(hex),
      hexa: this.setLetterCase(hexa)
    };
  }
  setColor(colorString) {
    const newColor = this.parseColor(colorString);
    if (newColor === null) {
      return false;
    }
    this.hue = newColor.hsva.h;
    this.saturation = newColor.hsva.s;
    this.brightness = newColor.hsva.v;
    this.alpha = this.opacity ? newColor.hsva.a * 100 : 100;
    this.syncValues();
    return true;
  }
  setLetterCase(string) {
    if (typeof string !== "string") {
      return "";
    }
    return this.uppercase ? string.toUpperCase() : string.toLowerCase();
  }
  async syncValues() {
    const currentColor = this.parseColor(
      `hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha / 100})`
    );
    if (currentColor === null) {
      return;
    }
    if (this.format === "hsl") {
      this.inputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
    } else if (this.format === "rgb") {
      this.inputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
    } else if (this.format === "hsv") {
      this.inputValue = this.opacity ? currentColor.hsva.string : currentColor.hsv.string;
    } else {
      this.inputValue = this.opacity ? currentColor.hexa : currentColor.hex;
    }
    this.isSafeValue = true;
    this.value = this.inputValue;
    await this.updateComplete;
    this.isSafeValue = false;
  }
  handleAfterHide() {
    this.previewButton.classList.remove("preview-color-copied");
    this.updateValidity();
  }
  handleAfterShow() {
    this.updateValidity();
  }
  handleEyeDropper() {
    if (!this.hasEyeDropper) {
      return;
    }
    const eyeDropper = new EyeDropper();
    eyeDropper.open().then((colorSelectionResult) => {
      const oldValue = this.value;
      this.setColor(colorSelectionResult.sRGBHex);
      if (this.value !== oldValue) {
        this.updateComplete.then(() => {
          this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
          this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        });
      }
    }).catch(() => {
    });
  }
  selectSwatch(color) {
    const oldValue = this.value;
    if (!this.disabled) {
      this.setColor(color);
      if (this.value !== oldValue) {
        this.updateComplete.then(() => {
          this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
          this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        });
      }
    }
  }
  /** Generates a hex string from HSV values. Hue must be 0-360. All other arguments must be 0-100. */
  getHexString(hue, saturation, brightness, alpha = 100) {
    const color = new TinyColor(`hsva(${hue}, ${saturation}%, ${brightness}%, ${alpha / 100})`);
    if (!color.isValid) {
      return "";
    }
    return color.toHex8String();
  }
  // Prevents nested components from leaking events
  stopNestedEventPropagation(event) {
    event.stopImmediatePropagation();
  }
  handleFormatChange() {
    this.syncValues();
  }
  handleOpacityChange() {
    this.alpha = 100;
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("value")) {
      this.handleValueChange(changedProperties.get("value") || "", this.value || "");
    }
  }
  handleValueChange(oldValue, newValue) {
    this.isEmpty = !newValue;
    if (!newValue) {
      this.hue = 0;
      this.saturation = 0;
      this.brightness = 100;
      this.alpha = 100;
    }
    if (!this.isSafeValue) {
      const newColor = this.parseColor(newValue);
      if (newColor !== null) {
        this.inputValue = this.value || "";
        this.hue = newColor.hsva.h;
        this.saturation = newColor.hsva.s;
        this.brightness = newColor.hsva.v;
        this.alpha = newColor.hsva.a * 100;
        this.syncValues();
      } else {
        this.inputValue = oldValue ?? "";
      }
    }
    this.requestUpdate();
  }
  /** Sets focus on the color picker. */
  focus(options) {
    this.trigger.focus(options);
  }
  /** Removes focus from the color picker. */
  blur() {
    const elementToBlur = this.trigger;
    if (this.hasFocus) {
      elementToBlur.focus({ preventScroll: true });
      elementToBlur.blur();
    }
    if (this.popup?.active) {
      this.hide();
    }
  }
  /** Returns the current value as a string in the specified format. */
  getFormattedValue(format = "hex") {
    const currentColor = this.parseColor(
      `hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha / 100})`
    );
    if (currentColor === null) {
      return "";
    }
    switch (format) {
      case "hex":
        return currentColor.hex;
      case "hexa":
        return currentColor.hexa;
      case "rgb":
        return currentColor.rgb.string;
      case "rgba":
        return currentColor.rgba.string;
      case "hsl":
        return currentColor.hsl.string;
      case "hsla":
        return currentColor.hsla.string;
      case "hsv":
        return currentColor.hsv.string;
      case "hsva":
        return currentColor.hsva.string;
      default:
        return "";
    }
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (!this.validity.valid && !this.open) {
      this.addEventListener("wa-after-show", this.reportValidityAfterShow, { once: true });
      this.show();
      if (!this.disabled) {
        this.dispatchEvent(new WaInvalidEvent());
      }
      return false;
    }
    return super.reportValidity();
  }
  formResetCallback() {
    this.value = this.defaultValue;
    super.formResetCallback();
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.hasEyeDropper = "EyeDropper" in window;
  }
  handleTriggerClick() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
      this.focus();
    }
  }
  async handleTriggerKeyDown(event) {
    if ([" ", "Enter"].includes(event.key)) {
      event.preventDefault();
      this.handleTriggerClick();
      return;
    }
  }
  handleTriggerKeyUp(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }
  updateAccessibleTrigger() {
    const accessibleTrigger = this.trigger;
    if (accessibleTrigger) {
      accessibleTrigger.setAttribute("aria-haspopup", "true");
      accessibleTrigger.setAttribute("aria-expanded", this.open ? "true" : "false");
    }
  }
  /** Shows the color picker panel. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "wa-after-show");
  }
  /** Hides the color picker panel */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "wa-after-hide");
  }
  addOpenListeners() {
    this.base.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
    registerDismissible(this);
  }
  removeOpenListeners() {
    if (this.base) {
      this.base.removeEventListener("keydown", this.handleKeyDown);
    }
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
    unregisterDismissible(this);
  }
  async handleOpenChange() {
    if (this.disabled) {
      this.open = false;
      return;
    }
    this.updateAccessibleTrigger();
    if (this.open) {
      this.dispatchEvent(new CustomEvent("wa-show"));
      this.addOpenListeners();
      await this.updateComplete;
      this.base.hidden = false;
      this.popup.active = true;
      await animateWithClass(this.popup.popup, "show-with-scale");
      this.dispatchEvent(new CustomEvent("wa-after-show"));
    } else {
      this.dispatchEvent(new CustomEvent("wa-hide"));
      this.removeOpenListeners();
      await animateWithClass(this.popup.popup, "hide-with-scale");
      this.base.hidden = true;
      this.popup.active = false;
      this.dispatchEvent(new CustomEvent("wa-after-hide"));
    }
  }
  render() {
    const hasLabelSlot = !this.hasUpdated ? this.withLabel : this.withLabel || this.hasSlotController.test("label");
    const hasHintSlot = !this.hasUpdated ? this.withHint : this.withHint || this.hasSlotController.test("hint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const gridHandleX = this.saturation;
    const gridHandleY = 100 - this.brightness;
    const normalizedSwatches = Array.isArray(this.swatches) ? this.swatches.map((s) => typeof s === "string" ? { color: s, label: s } : s) : this.swatches.split(";").filter((color) => color.trim() !== "").map((color) => ({ color: color.trim(), label: color.trim() }));
    const colorPicker = html`
      <div
        part="base"
        class=${classMap({
      "color-picker": true
    })}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex="-1"
      >
        <div
          part="grid"
          class="grid"
          style=${styleMap({ backgroundColor: this.getHexString(this.hue, 100, 100) })}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${classMap({
      "grid-handle": true,
      "grid-handle-dragging": this.isDraggingGridHandle
    })}
            style=${styleMap({
      top: `${gridHandleY}%`,
      left: `${gridHandleX}%`,
      backgroundColor: this.getHexString(this.hue, this.saturation, this.brightness, this.alpha)
    })}
            role="application"
            aria-label="HSV"
            tabindex=${ifDefined(this.disabled ? void 0 : "0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="controls">
          <div class="sliders">
            <div
              part="slider hue-slider"
              class="hue slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="slider-handle"
                style=${styleMap({
      left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`,
      backgroundColor: this.getHexString(this.hue, 100, 100)
    })}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${ifDefined(this.disabled ? void 0 : "0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity ? html`
                  <div
                    part="slider opacity-slider"
                    class="alpha slider transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="alpha-gradient"
                      style=${styleMap({
      backgroundImage: `linear-gradient(
                          to right,
                          ${this.getHexString(this.hue, this.saturation, this.brightness, 0)} 0%,
                          ${this.getHexString(this.hue, this.saturation, this.brightness, 100)} 100%
                        )`
    })}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="slider-handle"
                      style=${styleMap({
      left: `${this.alpha}%`,
      backgroundColor: this.getHexString(this.hue, this.saturation, this.brightness, this.alpha)
    })}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${ifDefined(this.disabled ? void 0 : "0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                ` : ""}
          </div>

          <button
            type="button"
            part="preview"
            class="preview transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${styleMap({
      "--preview-color": this.getHexString(this.hue, this.saturation, this.brightness, this.alpha)
    })}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="user-input" aria-live="polite">
          <wa-input
            part="input"
            type="text"
            name=${this.name}
            size="small"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            .value=${this.isEmpty ? "" : this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @change=${this.handleInputChange}
            @input=${this.handleInputInput}
            @blur=${this.stopNestedEventPropagation}
            @focus=${this.stopNestedEventPropagation}
          ></wa-input>

          <wa-button-group>
            ${!this.withoutFormatToggle ? html`
                  <wa-button
                    part="format-button"
                    size="small"
                    appearance="outlined"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      start:format-button__start,
                      label:format-button__label,
                      end:format-button__end,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @blur=${this.stopNestedEventPropagation}
                    @focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </wa-button>
                ` : ""}
            ${this.hasEyeDropper ? html`
                  <wa-button
                    part="eyedropper-button"
                    size="small"
                    appearance="outlined"
                    exportparts="
                      base:eyedropper-button__base,
                      start:eyedropper-button__start,
                      label:eyedropper-button__label,
                      end:eyedropper-button__end,
                      caret:eyedropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @blur=${this.stopNestedEventPropagation}
                    @focus=${this.stopNestedEventPropagation}
                  >
                    <wa-icon
                      library="system"
                      name="eyedropper"
                      variant="solid"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></wa-icon>
                  </wa-button>
                ` : ""}
          </wa-button-group>
        </div>

        ${normalizedSwatches.length > 0 ? html`
              <div part="swatches" class="swatches">
                ${normalizedSwatches.map((swatch) => {
      const parsedColor = this.parseColor(swatch.color);
      if (!parsedColor) {
        return "";
      }
      return html`
                    <div
                      part="swatch"
                      class="swatch transparent-bg"
                      tabindex=${ifDefined(this.disabled ? void 0 : "0")}
                      role="button"
                      aria-label=${swatch.label}
                      @click=${() => this.selectSwatch(swatch.color)}
                      @keydown=${(event) => !this.disabled && event.key === "Enter" && this.setColor(parsedColor.hexa)}
                    >
                      <div class="swatch-color" style=${styleMap({ backgroundColor: parsedColor.hexa })}></div>
                    </div>
                  `;
    })}
              </div>
            ` : ""}
      </div>
    `;
    return html`
      <div
        class=${classMap({
      container: true,
      "form-control": true,
      "form-control-has-label": hasLabel
    })}
        part="trigger-container form-control"
      >
        <div
          part="form-control-label"
          class=${classMap({
      label: true,
      "has-label": hasLabel
    })}
          id="form-control-label"
        >
          <slot name="label">${this.label}</slot>
        </div>

        <button
          id="trigger"
          part="trigger form-control-input"
          class=${classMap({
      trigger: true,
      "trigger-empty": this.isEmpty,
      "transparent-bg": true,
      "form-control-input": true
    })}
          style=${styleMap({
      color: this.getHexString(this.hue, this.saturation, this.brightness, this.alpha)
    })}
          type="button"
          aria-labelledby="form-control-label"
          aria-describedby="hint"
          .disabled=${this.disabled}
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        ></button>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${classMap({
      "has-slotted": hasHint
    })}
          >${this.hint}</slot
        >
      </div>

      <wa-popup
        class="color-popup"
        anchor="trigger"
        placement="bottom-start"
        distance="0"
        skidding="0"
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        aria-disabled=${this.disabled ? "true" : "false"}
        @wa-after-show=${this.handleAfterShow}
        @wa-after-hide=${this.handleAfterHide}
      >
        ${colorPicker}
      </wa-popup>
    `;
  }
};
WaColorPicker.css = [visually_hidden_styles_default, size_styles_default, form_control_styles_default, color_picker_styles_default];
WaColorPicker.shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
__decorateClass([
  query('[part~="base"]')
], WaColorPicker.prototype, "base", 2);
__decorateClass([
  query('[part~="input"]')
], WaColorPicker.prototype, "input", 2);
__decorateClass([
  query('[part~="form-control-label"]')
], WaColorPicker.prototype, "triggerLabel", 2);
__decorateClass([
  query('[part~="form-control-input"]')
], WaColorPicker.prototype, "triggerButton", 2);
__decorateClass([
  query(".color-popup")
], WaColorPicker.prototype, "popup", 2);
__decorateClass([
  query('[part~="preview"]')
], WaColorPicker.prototype, "previewButton", 2);
__decorateClass([
  query('[part~="trigger"]')
], WaColorPicker.prototype, "trigger", 2);
__decorateClass([
  state()
], WaColorPicker.prototype, "hasFocus", 2);
__decorateClass([
  state()
], WaColorPicker.prototype, "isDraggingGridHandle", 2);
__decorateClass([
  state()
], WaColorPicker.prototype, "isEmpty", 2);
__decorateClass([
  state()
], WaColorPicker.prototype, "inputValue", 2);
__decorateClass([
  state()
], WaColorPicker.prototype, "hue", 2);
__decorateClass([
  state()
], WaColorPicker.prototype, "saturation", 2);
__decorateClass([
  state()
], WaColorPicker.prototype, "brightness", 2);
__decorateClass([
  state()
], WaColorPicker.prototype, "alpha", 2);
__decorateClass([
  state()
], WaColorPicker.prototype, "value", 1);
__decorateClass([
  property({ attribute: "value", reflect: true })
], WaColorPicker.prototype, "defaultValue", 2);
__decorateClass([
  property({ attribute: "with-label", reflect: true, type: Boolean })
], WaColorPicker.prototype, "withLabel", 2);
__decorateClass([
  property({ attribute: "with-hint", reflect: true, type: Boolean })
], WaColorPicker.prototype, "withHint", 2);
__decorateClass([
  state()
], WaColorPicker.prototype, "hasEyeDropper", 2);
__decorateClass([
  property()
], WaColorPicker.prototype, "label", 2);
__decorateClass([
  property({ attribute: "hint" })
], WaColorPicker.prototype, "hint", 2);
__decorateClass([
  property()
], WaColorPicker.prototype, "format", 2);
__decorateClass([
  property({ reflect: true })
], WaColorPicker.prototype, "size", 2);
__decorateClass([
  property({ attribute: "without-format-toggle", type: Boolean })
], WaColorPicker.prototype, "withoutFormatToggle", 2);
__decorateClass([
  property({ reflect: true })
], WaColorPicker.prototype, "name", 2);
__decorateClass([
  property({ type: Boolean })
], WaColorPicker.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaColorPicker.prototype, "open", 2);
__decorateClass([
  property({ type: Boolean })
], WaColorPicker.prototype, "opacity", 2);
__decorateClass([
  property({ type: Boolean })
], WaColorPicker.prototype, "uppercase", 2);
__decorateClass([
  property()
], WaColorPicker.prototype, "swatches", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaColorPicker.prototype, "required", 2);
__decorateClass([
  eventOptions({ passive: false })
], WaColorPicker.prototype, "handleTouchMove", 1);
__decorateClass([
  watch("format", { waitUntilFirstUpdate: true })
], WaColorPicker.prototype, "handleFormatChange", 1);
__decorateClass([
  watch("opacity")
], WaColorPicker.prototype, "handleOpacityChange", 1);
__decorateClass([
  watch("value")
], WaColorPicker.prototype, "handleValueChange", 1);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], WaColorPicker.prototype, "handleOpenChange", 1);
WaColorPicker = __decorateClass([
  customElement("wa-color-picker")
], WaColorPicker);

export {
  WaColorPicker
};
