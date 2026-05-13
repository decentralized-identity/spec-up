/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  submitOnEnter
} from "./chunk.LKYJPJAQ.js";
import {
  input_styles_default
} from "./chunk.WS7SM5B3.js";
import {
  WaClearEvent
} from "./chunk.V6242M3W.js";
import {
  form_control_styles_default
} from "./chunk.KTP2IKLN.js";
import {
  MirrorValidator
} from "./chunk.E3UENDF5.js";
import {
  WebAwesomeFormAssociatedElement
} from "./chunk.GGEKIAF3.js";
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

// _bundle_/src/components/input/input.ts
import { html, isServer } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
var WaInput = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["blur", "input"];
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController(this);
    this.title = "";
    this.type = "text";
    this._value = null;
    this.defaultValue = this.getAttribute("value") || null;
    this.size = "medium";
    this.appearance = "outlined";
    this.pill = false;
    this.label = "";
    this.hint = "";
    this.withClear = false;
    this.placeholder = "";
    this.readonly = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.withoutSpinButtons = false;
    this.required = false;
    this.spellcheck = true;
    this.withLabel = false;
    this.withHint = false;
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
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
  handleChange(event) {
    this.value = this.input.value;
    this.relayNativeEvent(event, { bubbles: true, composed: true });
  }
  handleClearClick(event) {
    event.preventDefault();
    if (this.value !== "") {
      this.value = "";
      this.updateComplete.then(() => {
        this.dispatchEvent(new WaClearEvent());
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
    this.input.focus();
  }
  handleInput() {
    this.value = this.input.value;
  }
  handleKeyDown(event) {
    submitOnEnter(event, this);
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("defaultValue")) {
      this.customStates.set("blank", !this.value);
      this.updateValidity();
    }
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.updateValidity();
  }
  /** Sets focus on the input. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the input. */
  select() {
    this.input.select();
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode = "preserve") {
    const selectionStart = start ?? this.input.selectionStart;
    const selectionEnd = end ?? this.input.selectionEnd;
    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }
  /** Increments the value of a numeric input type by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Decrements the value of a numeric input type by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  formResetCallback() {
    this.value = null;
    if (this.input) {
      this.input.value = this.value;
    }
    super.formResetCallback();
  }
  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test("label") : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test("hint") : this.withHint;
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const hasClearIcon = this.withClear && !this.disabled && !this.readonly;
    const isClearIconVisible = (
      // prevents hydration mismatch errors.
      (isServer || this.hasUpdated) && hasClearIcon && (typeof this.value === "number" || this.value && this.value.length > 0)
    );
    return html`
      <label
        part="form-control-label label"
        class=${classMap({
      label: true,
      "has-label": hasLabel
    })}
        for="input"
        aria-hidden=${hasLabel ? "false" : "true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
          title=${this.title}
          name=${ifDefined(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${ifDefined(this.placeholder)}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step)}
          .value=${live(this.value ?? "")}
          autocapitalize=${ifDefined(this.autocapitalize)}
          autocomplete=${ifDefined(this.autocomplete)}
          autocorrect=${this.autocorrect ? "on" : "off"}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${ifDefined(this.pattern)}
          enterkeyhint=${ifDefined(this.enterkeyhint)}
          inputmode=${ifDefined(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${isClearIconVisible ? html`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            ` : ""}
        ${this.passwordToggle && !this.disabled ? html`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${!this.passwordVisible ? html`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    ` : html`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            ` : ""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${classMap({
      "has-slotted": hasHint
    })}
        aria-hidden=${hasHint ? "false" : "true"}
        >${this.hint}</slot
      >
    `;
  }
};
WaInput.css = [size_styles_default, form_control_styles_default, input_styles_default];
WaInput.shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
__decorateClass([
  query("input")
], WaInput.prototype, "input", 2);
__decorateClass([
  property()
], WaInput.prototype, "title", 2);
__decorateClass([
  property({ reflect: true })
], WaInput.prototype, "type", 2);
__decorateClass([
  state()
], WaInput.prototype, "value", 1);
__decorateClass([
  property({ attribute: "value", reflect: true })
], WaInput.prototype, "defaultValue", 2);
__decorateClass([
  property({ reflect: true })
], WaInput.prototype, "size", 2);
__decorateClass([
  property({ reflect: true })
], WaInput.prototype, "appearance", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaInput.prototype, "pill", 2);
__decorateClass([
  property()
], WaInput.prototype, "label", 2);
__decorateClass([
  property({ attribute: "hint" })
], WaInput.prototype, "hint", 2);
__decorateClass([
  property({ attribute: "with-clear", type: Boolean })
], WaInput.prototype, "withClear", 2);
__decorateClass([
  property()
], WaInput.prototype, "placeholder", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaInput.prototype, "readonly", 2);
__decorateClass([
  property({ attribute: "password-toggle", type: Boolean })
], WaInput.prototype, "passwordToggle", 2);
__decorateClass([
  property({ attribute: "password-visible", type: Boolean })
], WaInput.prototype, "passwordVisible", 2);
__decorateClass([
  property({ attribute: "without-spin-buttons", type: Boolean, reflect: true })
], WaInput.prototype, "withoutSpinButtons", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaInput.prototype, "required", 2);
__decorateClass([
  property()
], WaInput.prototype, "pattern", 2);
__decorateClass([
  property({ type: Number })
], WaInput.prototype, "minlength", 2);
__decorateClass([
  property({ type: Number })
], WaInput.prototype, "maxlength", 2);
__decorateClass([
  property()
], WaInput.prototype, "min", 2);
__decorateClass([
  property()
], WaInput.prototype, "max", 2);
__decorateClass([
  property()
], WaInput.prototype, "step", 2);
__decorateClass([
  property()
], WaInput.prototype, "autocapitalize", 2);
__decorateClass([
  property({
    type: Boolean,
    converter: {
      fromAttribute: (value) => !value || value === "off" ? false : true,
      toAttribute: (value) => value ? "on" : "off"
    }
  })
], WaInput.prototype, "autocorrect", 2);
__decorateClass([
  property()
], WaInput.prototype, "autocomplete", 2);
__decorateClass([
  property({ type: Boolean })
], WaInput.prototype, "autofocus", 2);
__decorateClass([
  property()
], WaInput.prototype, "enterkeyhint", 2);
__decorateClass([
  property({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], WaInput.prototype, "spellcheck", 2);
__decorateClass([
  property()
], WaInput.prototype, "inputmode", 2);
__decorateClass([
  property({ attribute: "with-label", type: Boolean })
], WaInput.prototype, "withLabel", 2);
__decorateClass([
  property({ attribute: "with-hint", type: Boolean })
], WaInput.prototype, "withHint", 2);
__decorateClass([
  watch("step", { waitUntilFirstUpdate: true })
], WaInput.prototype, "handleStepChange", 1);
WaInput = __decorateClass([
  customElement("wa-input")
], WaInput);

export {
  WaInput
};
