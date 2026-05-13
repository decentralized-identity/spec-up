/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  option_styles_default
} from "./chunk.J3EUDLZH.js";
import {
  LocalizeController
} from "./chunk.OK6DMFIY.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/option/option.ts
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

// _bundle_/src/internal/get-text.ts
function getText(root, depth = 0) {
  if (!root || !globalThis.Node) {
    return "";
  }
  if (typeof root[Symbol.iterator] === "function") {
    let nodes = Array.isArray(root) ? root : [...root];
    return nodes.map((node2) => getText(node2, --depth)).join("");
  }
  let node = root;
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? "";
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    let element = node;
    if (element.hasAttribute("slot") || element.matches("style, script")) {
      return "";
    }
    if (element instanceof HTMLSlotElement) {
      let assignedNodes = element.assignedNodes({ flatten: true });
      if (assignedNodes.length > 0) {
        return getText(assignedNodes, --depth);
      }
    }
    return depth > -1 ? getText(element, --depth) : element.textContent ?? "";
  }
  return node.hasChildNodes() ? getText(node.childNodes, --depth) : "";
}

// _bundle_/src/components/option/option.ts
var WaOption = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    // @ts-expect-error - Controller is currently unused
    this.localize = new LocalizeController(this);
    this.cachedDefaultLabel = "";
    this.isInitialized = false;
    this.isDefaultLabelDirty = true;
    this.current = false;
    this.value = "";
    this.disabled = false;
    this.selected = false;
    this.defaultSelected = false;
    this._label = "";
    this.handleHover = (event) => {
      if (event.type === "mouseenter") {
        this.customStates.set("hover", true);
      } else if (event.type === "mouseleave") {
        this.customStates.set("hover", false);
      }
    };
  }
  set label(value) {
    const oldValue = this._label;
    this._label = value || "";
    if (this._label !== oldValue) {
      this.requestUpdate("label", oldValue);
    }
  }
  get label() {
    if (this._label) {
      return this._label;
    }
    return this.defaultLabel;
  }
  /** The default label, generated from the element contents. Will be equal to `label` in most cases. */
  get defaultLabel() {
    if (this.isDefaultLabelDirty || !this.cachedDefaultLabel) {
      this.updateDefaultLabel();
    }
    return this.cachedDefaultLabel;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "option");
    this.setAttribute("aria-selected", "false");
    this.addEventListener("mouseenter", this.handleHover);
    this.addEventListener("mouseleave", this.handleHover);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mouseenter", this.handleHover);
    this.removeEventListener("mouseleave", this.handleHover);
  }
  handleDefaultSlotChange() {
    this.isDefaultLabelDirty = true;
    if (this.isInitialized) {
      customElements.whenDefined("wa-select").then(() => {
        const controller = this.closest("wa-select");
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });
      customElements.whenDefined("wa-combobox").then(() => {
        const controller = this.closest("wa-combobox");
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });
    } else {
      this.isInitialized = true;
    }
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("defaultSelected")) {
      if (!this.closest("wa-combobox, wa-select")?.hasInteracted) {
        if (this.defaultSelected) {
          const oldVal = this.selected;
          this.selected = this.defaultSelected;
          this.requestUpdate("selected", oldVal);
        }
      }
    }
    super.willUpdate(changedProperties);
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("disabled")) {
      this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }
    if (changedProperties.has("selected")) {
      this.setAttribute("aria-selected", this.selected ? "true" : "false");
      this.customStates.set("selected", this.selected);
      this.handleDefaultSlotChange();
    }
    if (changedProperties.has("value")) {
      if (typeof this.value !== "string") {
        this.value = String(this.value);
      }
      this.handleDefaultSlotChange();
    }
    if (changedProperties.has("current")) {
      this.customStates.set("current", this.current);
    }
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.selected && !this.defaultSelected) {
      const parent = this.closest("wa-select, wa-combobox");
      if (parent && !parent.hasInteracted) {
        parent.selectionChanged?.();
      }
    }
  }
  updateDefaultLabel() {
    let oldValue = this.cachedDefaultLabel;
    this.cachedDefaultLabel = getText(this).trim();
    this.isDefaultLabelDirty = false;
    let changed = this.cachedDefaultLabel !== oldValue;
    if (!this._label && changed) {
      this.requestUpdate("label", oldValue);
    }
    return changed;
  }
  render() {
    return html`
      ${this.selected ? html`<wa-icon
            part="checked-icon"
            class="check"
            name="check"
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>` : html`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `;
  }
};
WaOption.css = option_styles_default;
__decorateClass([
  query(".label")
], WaOption.prototype, "defaultSlot", 2);
__decorateClass([
  state()
], WaOption.prototype, "current", 2);
__decorateClass([
  property({ reflect: true })
], WaOption.prototype, "value", 2);
__decorateClass([
  property({ type: Boolean })
], WaOption.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, attribute: false })
], WaOption.prototype, "selected", 2);
__decorateClass([
  property({ type: Boolean, attribute: "selected" })
], WaOption.prototype, "defaultSelected", 2);
__decorateClass([
  property()
], WaOption.prototype, "label", 1);
WaOption = __decorateClass([
  customElement("wa-option")
], WaOption);

export {
  WaOption
};
