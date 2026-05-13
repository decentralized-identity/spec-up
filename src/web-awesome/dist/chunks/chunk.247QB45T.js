/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  checkbox_styles_default
} from "./chunk.XDKUXEMR.js";
import {
  RequiredValidator
} from "./chunk.JPXNJ5XW.js";
import {
  form_control_styles_default
} from "./chunk.KTP2IKLN.js";
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
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/checkbox/checkbox.ts
import { html, isServer } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
var WaCheckbox = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "hint");
    this.title = "";
    this.name = null;
    this._value = this.getAttribute("value") ?? null;
    this.size = "medium";
    this.disabled = false;
    this.indeterminate = false;
    this._checked = null;
    this.defaultChecked = this.hasAttribute("checked");
    this.required = false;
    this.hint = "";
  }
  static get validators() {
    const validators = isServer ? [] : [
      RequiredValidator({
        validationProperty: "checked",
        // Use a checkbox so we get "free" translation strings.
        validationElement: Object.assign(document.createElement("input"), {
          type: "checkbox",
          required: true
        })
      })
    ];
    return [...super.validators, ...validators];
  }
  /** The value of the checkbox, submitted as a name/value pair with form data. */
  get value() {
    const val = this._value || "on";
    return this.checked ? val : null;
  }
  set value(val) {
    this._value = val;
  }
  get checked() {
    if (this.valueHasChanged) {
      return Boolean(this._checked);
    }
    return this._checked ?? this.defaultChecked;
  }
  set checked(val) {
    this._checked = Boolean(val);
    this.valueHasChanged = true;
  }
  handleClick() {
    this.hasInteracted = true;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleDefaultCheckedChange();
  }
  handleDefaultCheckedChange() {
    this.handleValueOrCheckedChange();
  }
  handleValueOrCheckedChange() {
    this.setValue(this.checked ? this.value : null, this._value);
    this.updateValidity();
  }
  handleStateChange() {
    if (this.hasUpdated) {
      this.input.checked = this.checked;
      this.input.indeterminate = this.indeterminate;
    }
    this.customStates.set("checked", this.checked);
    this.customStates.set("indeterminate", this.indeterminate);
    this.updateValidity();
  }
  handleDisabledChange() {
    this.customStates.set("disabled", this.disabled);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("checked") || changedProperties.has("defaultChecked")) {
      this.handleValueOrCheckedChange();
    }
  }
  formResetCallback() {
    this._checked = null;
    super.formResetCallback();
    this.handleValueOrCheckedChange();
  }
  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }
  /** Sets focus on the checkbox. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }
  render() {
    const hasHintSlot = isServer ? true : this.hasSlotController.test("hint");
    const hasHint = this.hint ? true : !!hasHintSlot;
    const isIndeterminate = !this.checked && this.indeterminate;
    const iconName = isIndeterminate ? "indeterminate" : "check";
    const iconState = isIndeterminate ? "indeterminate" : "check";
    return html`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${ifDefined(this.name)}
            value=${ifDefined(this._value)}
            .indeterminate=${live(this.indeterminate)}
            .checked=${live(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked ? "true" : "false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${iconState}-icon icon" library="system" name=${iconName}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${hasHint ? "false" : "true"}
        class="${classMap({ "has-slotted": hasHint })}"
      >
        ${this.hint}
      </slot>
    `;
  }
};
WaCheckbox.css = [form_control_styles_default, size_styles_default, checkbox_styles_default];
WaCheckbox.shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
__decorateClass([
  query('input[type="checkbox"]')
], WaCheckbox.prototype, "input", 2);
__decorateClass([
  property()
], WaCheckbox.prototype, "title", 2);
__decorateClass([
  property({ reflect: true })
], WaCheckbox.prototype, "name", 2);
__decorateClass([
  property({ reflect: true })
], WaCheckbox.prototype, "value", 1);
__decorateClass([
  property({ reflect: true })
], WaCheckbox.prototype, "size", 2);
__decorateClass([
  property({ type: Boolean })
], WaCheckbox.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaCheckbox.prototype, "indeterminate", 2);
__decorateClass([
  property({ type: Boolean, attribute: false })
], WaCheckbox.prototype, "checked", 1);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "checked" })
], WaCheckbox.prototype, "defaultChecked", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaCheckbox.prototype, "required", 2);
__decorateClass([
  property()
], WaCheckbox.prototype, "hint", 2);
__decorateClass([
  watch(["checked", "defaultChecked"])
], WaCheckbox.prototype, "handleDefaultCheckedChange", 1);
__decorateClass([
  watch(["checked", "indeterminate"])
], WaCheckbox.prototype, "handleStateChange", 1);
__decorateClass([
  watch("disabled")
], WaCheckbox.prototype, "handleDisabledChange", 1);
WaCheckbox = __decorateClass([
  customElement("wa-checkbox")
], WaCheckbox);

export {
  WaCheckbox
};
