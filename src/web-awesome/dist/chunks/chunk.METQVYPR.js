/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaCopyEvent
} from "./chunk.AS62AJ52.js";
import {
  copy_button_styles_default
} from "./chunk.WYALOEE6.js";
import {
  visually_hidden_styles_default
} from "./chunk.G43BFAJO.js";
import {
  animateWithClass
} from "./chunk.ZRLIH7NU.js";
import {
  WaErrorEvent
} from "./chunk.ESI5P3UH.js";
import {
  LocalizeController
} from "./chunk.OK6DMFIY.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/copy-button/copy-button.ts
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
var WaCopyButton = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.isCopying = false;
    this.status = "rest";
    this.value = "";
    this.from = "";
    this.disabled = false;
    this.copyLabel = "";
    this.successLabel = "";
    this.errorLabel = "";
    this.feedbackDuration = 1e3;
    this.tooltipPlacement = "top";
  }
  get currentLabel() {
    if (this.status === "success") {
      return this.successLabel || this.localize.term("copied");
    }
    if (this.status === "error") {
      return this.errorLabel || this.localize.term("error");
    }
    return this.copyLabel || this.localize.term("copy");
  }
  async handleCopy() {
    if (this.disabled || this.isCopying) {
      return;
    }
    this.isCopying = true;
    let valueToCopy = this.value;
    if (this.from) {
      const root = this.getRootNode();
      const isProperty = this.from.includes(".");
      const isAttribute = this.from.includes("[") && this.from.includes("]");
      let id = this.from;
      let field = "";
      if (isProperty) {
        [id, field] = this.from.trim().split(".");
      } else if (isAttribute) {
        [id, field] = this.from.trim().replace(/\]$/, "").split("[");
      }
      const target = "getElementById" in root ? root.getElementById(id) : null;
      if (target) {
        if (isAttribute) {
          valueToCopy = target.getAttribute(field) || "";
        } else if (isProperty) {
          valueToCopy = target[field] || "";
        } else {
          valueToCopy = target.textContent || "";
        }
      } else {
        this.showStatus("error");
        this.dispatchEvent(new WaErrorEvent());
      }
    }
    if (!valueToCopy) {
      this.showStatus("error");
      this.dispatchEvent(new WaErrorEvent());
    } else {
      try {
        await navigator.clipboard.writeText(valueToCopy);
        this.showStatus("success");
        this.dispatchEvent(new WaCopyEvent({ value: valueToCopy }));
      } catch (error) {
        this.showStatus("error");
        this.dispatchEvent(new WaErrorEvent());
      }
    }
  }
  async showStatus(status) {
    const iconToShow = status === "success" ? this.successIcon : this.errorIcon;
    await animateWithClass(this.copyIcon, "hide");
    this.copyIcon.hidden = true;
    this.status = status;
    iconToShow.hidden = false;
    await animateWithClass(iconToShow, "show");
    setTimeout(async () => {
      await animateWithClass(iconToShow, "hide");
      iconToShow.hidden = true;
      this.status = "rest";
      this.copyIcon.hidden = false;
      await animateWithClass(this.copyIcon, "show");
      this.isCopying = false;
    }, this.feedbackDuration);
  }
  render() {
    return html`
      <button
        class="button"
        part="button"
        type="button"
        id="copy-button"
        ?disabled=${this.disabled}
        @click=${this.handleCopy}
      >
        <!-- Render a visually hidden label to appease the accessibility checking gods -->
        <span class="wa-visually-hidden">${this.currentLabel}</span>
        <slot part="copy-icon" name="copy-icon">
          <wa-icon library="system" name="copy" variant="regular"></wa-icon>
        </slot>
        <slot part="success-icon" name="success-icon" variant="solid" hidden>
          <wa-icon library="system" name="check"></wa-icon>
        </slot>
        <slot part="error-icon" name="error-icon" variant="solid" hidden>
          <wa-icon library="system" name="xmark"></wa-icon>
        </slot>
        <wa-tooltip
          class=${classMap({
      "copy-button": true,
      "copy-button-success": this.status === "success",
      "copy-button-error": this.status === "error"
    })}
          for="copy-button"
          placement=${this.tooltipPlacement}
          ?disabled=${this.disabled}
          exportparts="
            base:tooltip__base,
            base__popup:tooltip__base__popup,
            base__arrow:tooltip__base__arrow,
            body:tooltip__body
          "
          >${this.currentLabel}</wa-tooltip
        >
      </button>
    `;
  }
};
WaCopyButton.css = [visually_hidden_styles_default, copy_button_styles_default];
__decorateClass([
  query('slot[name="copy-icon"]')
], WaCopyButton.prototype, "copyIcon", 2);
__decorateClass([
  query('slot[name="success-icon"]')
], WaCopyButton.prototype, "successIcon", 2);
__decorateClass([
  query('slot[name="error-icon"]')
], WaCopyButton.prototype, "errorIcon", 2);
__decorateClass([
  query("wa-tooltip")
], WaCopyButton.prototype, "tooltip", 2);
__decorateClass([
  state()
], WaCopyButton.prototype, "isCopying", 2);
__decorateClass([
  state()
], WaCopyButton.prototype, "status", 2);
__decorateClass([
  property()
], WaCopyButton.prototype, "value", 2);
__decorateClass([
  property()
], WaCopyButton.prototype, "from", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaCopyButton.prototype, "disabled", 2);
__decorateClass([
  property({ attribute: "copy-label" })
], WaCopyButton.prototype, "copyLabel", 2);
__decorateClass([
  property({ attribute: "success-label" })
], WaCopyButton.prototype, "successLabel", 2);
__decorateClass([
  property({ attribute: "error-label" })
], WaCopyButton.prototype, "errorLabel", 2);
__decorateClass([
  property({ attribute: "feedback-duration", type: Number })
], WaCopyButton.prototype, "feedbackDuration", 2);
__decorateClass([
  property({ attribute: "tooltip-placement" })
], WaCopyButton.prototype, "tooltipPlacement", 2);
WaCopyButton = __decorateClass([
  customElement("wa-copy-button")
], WaCopyButton);

export {
  WaCopyButton
};
