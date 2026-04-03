/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  switch_styles_default
} from "./chunk.TDFF7FCH.js";
import {
  l
} from "./chunk.KZZR6Z6I.js";
import {
  form_control_styles_default
} from "./chunk.Y5LJWEUS.js";
import {
  MirrorValidator
} from "./chunk.E3UENDF5.js";
import {
  WebAwesomeFormAssociatedElement
} from "./chunk.3ZTA22M4.js";
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
  o
} from "./chunk.3MSWQ3RG.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
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

// _bundle_/src/components/switch/switch.ts
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
    return x`
      <label
        part="base"
        class=${e2({
      checked: this.checked,
      disabled: this.disabled
    })}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${o(this.name)}
          value=${o(this.value)}
          .checked=${l(this.checked)}
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
        class=${e2({
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
  e('input[type="checkbox"]')
], WaSwitch.prototype, "input", 2);
__decorateClass([
  n()
], WaSwitch.prototype, "title", 2);
__decorateClass([
  n({ reflect: true })
], WaSwitch.prototype, "name", 2);
__decorateClass([
  n({ reflect: true })
], WaSwitch.prototype, "value", 1);
__decorateClass([
  n({ reflect: true })
], WaSwitch.prototype, "size", 2);
__decorateClass([
  n({ type: Boolean })
], WaSwitch.prototype, "disabled", 2);
__decorateClass([
  n({ type: Boolean, attribute: false })
], WaSwitch.prototype, "checked", 1);
__decorateClass([
  n({ type: Boolean, attribute: "checked", reflect: true })
], WaSwitch.prototype, "defaultChecked", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaSwitch.prototype, "required", 2);
__decorateClass([
  n({ attribute: "hint" })
], WaSwitch.prototype, "hint", 2);
__decorateClass([
  n({ attribute: "with-hint", type: Boolean })
], WaSwitch.prototype, "withHint", 2);
__decorateClass([
  watch(["checked", "defaultChecked"])
], WaSwitch.prototype, "handleStateChange", 1);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], WaSwitch.prototype, "handleDisabledChange", 1);
WaSwitch = __decorateClass([
  t("wa-switch")
], WaSwitch);

export {
  WaSwitch
};
