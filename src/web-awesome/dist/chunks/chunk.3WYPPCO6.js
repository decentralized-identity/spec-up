/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  MirrorValidator
} from "./chunk.E3UENDF5.js";
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
  button_styles_default
} from "./chunk.H2BBUBXP.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  LocalizeController
} from "./chunk.OK6DMFIY.js";
import {
  variants_styles_default
} from "./chunk.MFAIEGTH.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/button/button.ts
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html, literal } from "lit/static-html.js";
var WaButton = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["click"];
    this.hasSlotController = new HasSlotController(this, "[default]", "start", "end");
    this.localize = new LocalizeController(this);
    this.invalid = false;
    this.isIconButton = false;
    this.title = "";
    this.variant = "neutral";
    this.appearance = "accent";
    this.size = "medium";
    this.withCaret = false;
    this.disabled = false;
    this.loading = false;
    this.pill = false;
    this.type = "button";
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
  }
  constructLightDOMButton() {
    const button = document.createElement("button");
    for (const attribute of this.attributes) {
      if (attribute.name === "style") {
        continue;
      }
      button.setAttribute(attribute.name, attribute.value);
    }
    button.type = this.type;
    button.style.position = "absolute !important";
    button.style.width = "0 !important";
    button.style.height = "0 !important";
    button.style.clipPath = "inset(50%) !important";
    button.style.overflow = "hidden !important";
    button.style.whiteSpace = "nowrap !important";
    if (this.name) {
      button.name = this.name;
    }
    button.value = this.value || "";
    return button;
  }
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (this.type !== "submit" && this.type !== "reset") {
      return;
    }
    const form = this.getForm();
    if (!form) return;
    const lightDOMButton = this.constructLightDOMButton();
    this.parentElement?.append(lightDOMButton);
    lightDOMButton.click();
    lightDOMButton.remove();
  }
  handleInvalid() {
    this.dispatchEvent(new WaInvalidEvent());
  }
  handleLabelSlotChange() {
    const nodes = this.labelSlot.assignedNodes({ flatten: true });
    let hasIconLabel = false;
    let hasIcon = false;
    let hasText = false;
    let hasOtherElements = false;
    [...nodes].forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        if (element.localName === "wa-icon") {
          hasIcon = true;
          if (!hasIconLabel) hasIconLabel = element.label !== void 0;
        } else {
          hasOtherElements = true;
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim() || "";
        if (text.length > 0) {
          hasText = true;
        }
      }
    });
    this.isIconButton = hasIcon && !hasText && !hasOtherElements;
    if (this.isIconButton && !hasIconLabel) {
      console.warn(
        'Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',
        this
      );
    }
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    this.updateValidity();
  }
  // eslint-disable-next-line
  setValue(..._args) {
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? literal`a` : literal`button`;
    return html`
      <${tag}
        part="base"
        class=${classMap({
      button: true,
      caret: this.withCaret,
      disabled: this.disabled,
      loading: this.loading,
      rtl: this.localize.dir() === "rtl",
      "has-label": this.hasSlotController.test("[default]"),
      "has-start": this.hasSlotController.test("start"),
      "has-end": this.hasSlotController.test("end"),
      "is-icon-button": this.isIconButton
    })}
        ?disabled=${ifDefined(isLink ? void 0 : this.disabled)}
        type=${ifDefined(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${ifDefined(isLink ? void 0 : this.name)}
        value=${ifDefined(isLink ? void 0 : this.value)}
        href=${ifDefined(isLink ? this.href : void 0)}
        target=${ifDefined(isLink ? this.target : void 0)}
        download=${ifDefined(isLink ? this.download : void 0)}
        rel=${ifDefined(isLink && this.rel ? this.rel : void 0)}
        role=${ifDefined(isLink ? void 0 : "button")}
        aria-disabled=${ifDefined(isLink && this.disabled ? "true" : void 0)}
        tabindex=${this.disabled ? "-1" : "0"}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret ? html`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              ` : ""}
        ${this.loading ? html`<wa-spinner part="spinner"></wa-spinner>` : ""}
      </${tag}>
    `;
  }
};
WaButton.shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
WaButton.css = [button_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  query(".button")
], WaButton.prototype, "button", 2);
__decorateClass([
  query("slot:not([name])")
], WaButton.prototype, "labelSlot", 2);
__decorateClass([
  state()
], WaButton.prototype, "invalid", 2);
__decorateClass([
  state()
], WaButton.prototype, "isIconButton", 2);
__decorateClass([
  property()
], WaButton.prototype, "title", 2);
__decorateClass([
  property({ reflect: true })
], WaButton.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], WaButton.prototype, "appearance", 2);
__decorateClass([
  property({ reflect: true })
], WaButton.prototype, "size", 2);
__decorateClass([
  property({ attribute: "with-caret", type: Boolean, reflect: true })
], WaButton.prototype, "withCaret", 2);
__decorateClass([
  property({ type: Boolean })
], WaButton.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaButton.prototype, "loading", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaButton.prototype, "pill", 2);
__decorateClass([
  property()
], WaButton.prototype, "type", 2);
__decorateClass([
  property({ reflect: true })
], WaButton.prototype, "name", 2);
__decorateClass([
  property({ reflect: true })
], WaButton.prototype, "value", 2);
__decorateClass([
  property({ reflect: true })
], WaButton.prototype, "href", 2);
__decorateClass([
  property()
], WaButton.prototype, "target", 2);
__decorateClass([
  property()
], WaButton.prototype, "rel", 2);
__decorateClass([
  property()
], WaButton.prototype, "download", 2);
__decorateClass([
  property({ attribute: "formaction" })
], WaButton.prototype, "formAction", 2);
__decorateClass([
  property({ attribute: "formenctype" })
], WaButton.prototype, "formEnctype", 2);
__decorateClass([
  property({ attribute: "formmethod" })
], WaButton.prototype, "formMethod", 2);
__decorateClass([
  property({ attribute: "formnovalidate", type: Boolean })
], WaButton.prototype, "formNoValidate", 2);
__decorateClass([
  property({ attribute: "formtarget" })
], WaButton.prototype, "formTarget", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], WaButton.prototype, "handleDisabledChange", 1);
WaButton = __decorateClass([
  customElement("wa-button")
], WaButton);

export {
  WaButton
};
