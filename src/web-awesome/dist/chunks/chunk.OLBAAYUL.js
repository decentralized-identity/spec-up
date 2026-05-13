/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  switch_styles_default
} from "./chunk.4YQ2IATC.js";
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
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/switch/switch.ts
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
var WaSwitch = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "hint");
    this.title = "";
    this.name = null;
    this._value = this.getAttribute("value") ?? null;
    this.size = "medium";
    this.disabled = false;
    this._checked = null;
    this.defaultChecked = this.hasAttribute("checked");
    this.required = false;
    this.hint = "";
    this.withHint = false;
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
  }
  /** The value of the switch, submitted as a name/value pair with form data. */
  get value() {
    return this._value ?? "on";
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
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.handleValueOrCheckedChange();
  }
  handleClick() {
    this.hasInteracted = true;
    this.checked = !this.checked;
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }
  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.checked = false;
      this.updateComplete.then(() => {
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      });
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.checked = true;
      this.updateComplete.then(() => {
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      });
    }
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("checked") || changedProperties.has("defaultChecked")) {
      this.handleValueOrCheckedChange();
    }
  }
  handleValueOrCheckedChange() {
    this.setValue(this.checked ? this.value : null, this._value);
    this.updateValidity();
  }
  handleStateChange() {
    if (this.hasUpdated) {
      this.input.checked = this.checked;
    }
    this.customStates.set("checked", this.checked);
    this.updateValidity();
  }
  handleDisabledChange() {
    this.updateValidity();
  }
  /** Simulates a click on the switch. */
  click() {
    this.input.click();
  }
  /** Sets focus on the switch. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the switch. */
  blur() {
    this.input.blur();
  }
  setValue(value, stateValue) {
    if (!this.checked) {
      this.internals.setFormValue(null, null);
      return;
    }
    this.internals.setFormValue(value ?? "on", stateValue);
  }
  formResetCallback() {
    this._checked = null;
    super.formResetCallback();
    this.handleValueOrCheckedChange();
  }
  render() {
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test("hint") : this.withHint;
    const hasHint = this.hint ? true : !!hasHintSlot;
    return html`
      <label
        part="base"
        class=${classMap({
      checked: this.checked,
      disabled: this.disabled
    })}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${classMap({
      "has-slotted": hasHint
    })}
        aria-hidden=${hasHint ? "false" : "true"}
        >${this.hint}</slot
      >
    `;
  }
};
WaSwitch.shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
WaSwitch.css = [form_control_styles_default, size_styles_default, switch_styles_default];
__decorateClass([
  query('input[type="checkbox"]')
], WaSwitch.prototype, "input", 2);
__decorateClass([
  property()
], WaSwitch.prototype, "title", 2);
__decorateClass([
  property({ reflect: true })
], WaSwitch.prototype, "name", 2);
__decorateClass([
  property({ reflect: true })
], WaSwitch.prototype, "value", 1);
__decorateClass([
  property({ reflect: true })
], WaSwitch.prototype, "size", 2);
__decorateClass([
  property({ type: Boolean })
], WaSwitch.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, attribute: false })
], WaSwitch.prototype, "checked", 1);
__decorateClass([
  property({ type: Boolean, attribute: "checked", reflect: true })
], WaSwitch.prototype, "defaultChecked", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaSwitch.prototype, "required", 2);
__decorateClass([
  property({ attribute: "hint" })
], WaSwitch.prototype, "hint", 2);
__decorateClass([
  property({ attribute: "with-hint", type: Boolean })
], WaSwitch.prototype, "withHint", 2);
__decorateClass([
  watch(["checked", "defaultChecked"])
], WaSwitch.prototype, "handleStateChange", 1);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], WaSwitch.prototype, "handleDisabledChange", 1);
WaSwitch = __decorateClass([
  customElement("wa-switch")
], WaSwitch);

export {
  WaSwitch
};
