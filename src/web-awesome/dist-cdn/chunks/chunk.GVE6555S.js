/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaCreateEvent
} from "./chunk.WFODKN2M.js";
import {
  o as o3
} from "./chunk.2BXLTQVW.js";
import {
  scrollIntoView
} from "./chunk.HQKLFGS3.js";
import {
  combobox_styles_default
} from "./chunk.7MZTEU3F.js";
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
  WaClearEvent
} from "./chunk.V6242M3W.js";
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
} from "./chunk.Y5LJWEUS.js";
import {
  waitForEvent
} from "./chunk.572W6XBT.js";
import {
  animateWithClass
} from "./chunk.ZRLIH7NU.js";
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
  o as o2
} from "./chunk.3MSWQ3RG.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  LocalizeController
} from "./chunk.5EW4WF6V.js";
import {
  e,
  n,
  r,
  t
} from "./chunk.JB4GDECI.js";
import {
  o
} from "./chunk.7OBLIRXR.js";
import {
  E,
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/combobox/combobox.ts
var optionIdCounter = 0;
function generateOptionId() {
  return `wa-combobox-option-${++optionIdCounter}`;
}
var WaCombobox = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["blur", "input"];
    this.createOptionEl = null;
    this.hasInputSinceOpening = false;
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController(this);
    this.listboxId = `wa-combobox-listbox-${++optionIdCounter}`;
    this.selectionOrder = /* @__PURE__ */ new Map();
    this.slotChangePending = false;
    this.cachedOptions = null;
    this.selectedOptions = [];
    this.filteredOptions = [];
    this.inputValue = "";
    this.name = "";
    this._defaultValue = null;
    this.size = "medium";
    this.placeholder = "";
    this.multiple = false;
    this.maxOptionsVisible = 3;
    this.disabled = false;
    this.withClear = false;
    this.open = false;
    this.appearance = "outlined";
    this.pill = false;
    this.label = "";
    this.placement = "bottom";
    this.hint = "";
    this.withLabel = false;
    this.withHint = false;
    this.required = false;
    this.allowCustomValue = false;
    this.allowCreate = false;
    this.filter = null;
    this.spellcheck = false;
    this.getTag = (option) => {
      return x`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${option.value}
          @wa-remove=${(event) => this.handleTagRemove(event, option)}
        >
          ${option.label}
        </wa-tag>
      `;
    };
    this.handleDocumentFocusIn = (event) => {
      const path = event.composedPath();
      if (this && !path.includes(this)) {
        this.hide();
      }
    };
    this.handleDocumentKeyDown = (event) => {
      const target = event.target;
      const isClearButton = target.closest('[part~="clear-button"]') !== null;
      const isButton = target.closest("wa-button") !== null;
      if (isClearButton || isButton) {
        return;
      }
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.hide();
        if (!this.multiple && this.selectedOptions.length > 0) {
          this.inputValue = this.selectedOptions[0].label;
        } else if (!this.multiple) {
          this.inputValue = "";
        }
        this.comboboxInput.focus({ preventScroll: true });
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (!this.open) {
          this.show();
          return;
        }
        if (this.currentOption && this.handleCreateOptionSelected(this.currentOption)) {
          return;
        }
        if (this.currentOption && !this.currentOption.disabled) {
          this.valueHasChanged = true;
          this.hasInteracted = true;
          if (this.multiple) {
            this.toggleOptionSelection(this.currentOption);
            this.inputValue = "";
            this.updateFilteredOptions();
          } else {
            this.setSelectedOptions(this.currentOption);
            this.inputValue = this.currentOption.label;
          }
          this.updateComplete.then(() => {
            this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
          });
          if (!this.multiple) {
            this.hide();
            this.comboboxInput.focus({ preventScroll: true });
          }
        } else if (this.allowCustomValue && !this.multiple && this.inputValue) {
          this.value = this.inputValue;
          this.valueHasChanged = true;
          this.hasInteracted = true;
          this.updateComplete.then(() => {
            this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
          });
          this.hide();
          this.comboboxInput.focus({ preventScroll: true });
        }
        return;
      }
      if (event.key === "Backspace" && this.multiple && !this.inputValue && this.selectedOptions.length > 0) {
        event.preventDefault();
        this.hasInteracted = true;
        this.valueHasChanged = true;
        const lastOption = this.selectedOptions[this.selectedOptions.length - 1];
        this.toggleOptionSelection(lastOption, false);
        this.updateComplete.then(() => {
          this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
          this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        });
        return;
      }
      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
        const visibleOptions = this.getVisibleOptions();
        const currentIndex = visibleOptions.indexOf(this.currentOption);
        let newIndex = Math.max(0, currentIndex);
        event.preventDefault();
        if (!this.open) {
          this.show();
          if (this.currentOption) {
            return;
          }
        }
        if (event.key === "ArrowDown") {
          newIndex = currentIndex + 1;
          if (newIndex > visibleOptions.length - 1) newIndex = 0;
        } else if (event.key === "ArrowUp") {
          newIndex = currentIndex - 1;
          if (newIndex < 0) newIndex = visibleOptions.length - 1;
        } else if (event.key === "Home") {
          newIndex = 0;
        } else if (event.key === "End") {
          newIndex = visibleOptions.length - 1;
        }
        if (visibleOptions[newIndex]) {
          this.setCurrentOption(visibleOptions[newIndex]);
          this.announceOption(visibleOptions[newIndex]);
        }
      }
    };
    this.handleDocumentMouseDown = (event) => {
      const path = event.composedPath();
      if (this && !path.includes(this)) {
        this.hide();
      }
    };
  }
  static get validators() {
    const validators = o ? [] : [
      RequiredValidator({
        validationElement: Object.assign(document.createElement("select"), { required: true })
      })
    ];
    return [...super.validators, ...validators];
  }
  /** Where to anchor native constraint validation */
  get validationTarget() {
    return this.valueInput;
  }
  set defaultValue(val) {
    this._defaultValue = this.convertDefaultValue(val);
  }
  get defaultValue() {
    return this.convertDefaultValue(this._defaultValue);
  }
  /**
   * A converter for defaultValue from array to string if its multiple. Also fixes some hydration issues.
   */
  convertDefaultValue(val) {
    const isMultiple = this.multiple || this.hasAttribute("multiple");
    if (!isMultiple && Array.isArray(val)) {
      val = val[0];
    }
    return val;
  }
  set value(val) {
    let oldValue = this.value;
    if (val instanceof FormData) {
      val = val.getAll(this.name);
    }
    if (val != null && !Array.isArray(val)) {
      val = [val];
    }
    this._value = val ?? null;
    let newValue = this.value;
    if (newValue !== oldValue) {
      this.valueHasChanged = true;
      this.requestUpdate("value", oldValue);
    }
  }
  get value() {
    let value = this._value ?? this.defaultValue ?? null;
    if (value != null) {
      value = Array.isArray(value) ? value : [value];
    }
    if (this.optionValues === void 0) {
      if (value == null) {
        this.optionValues = /* @__PURE__ */ new Set(null);
      } else {
        this.optionValues = new Set(
          this.getRealOptions().filter((option) => !option.disabled).map((option) => option.value)
        );
      }
    }
    let ret = value;
    if (value != null) {
      if (!this.allowCustomValue) {
        ret = value.filter((v) => this.optionValues.has(v));
      } else {
        ret = value;
      }
      ret = this.multiple ? ret : ret[0];
      ret = ret ?? null;
    }
    return ret;
  }
  connectedCallback() {
    super.connectedCallback();
    this.processSlotChange();
    this.open = false;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeOpenListeners();
    this.removeCreateOption();
    this.cachedOptions = null;
  }
  updateDefaultValue() {
    const allOptions = this.getRealOptions();
    const defaultSelectedOptions = allOptions.filter((el) => el.hasAttribute("selected") || el.defaultSelected);
    if (defaultSelectedOptions.length > 0) {
      const selectedValues = defaultSelectedOptions.map((el) => el.value);
      this._defaultValue = this.multiple ? selectedValues : selectedValues[0];
    }
    if (this.hasAttribute("value")) {
      this._defaultValue = this.getAttribute("value") || null;
    }
  }
  addOpenListeners() {
    document.addEventListener("focusin", this.handleDocumentFocusIn);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
    registerDismissible(this);
    if (this.getRootNode() !== document) {
      this.getRootNode().addEventListener("focusin", this.handleDocumentFocusIn);
    }
  }
  removeOpenListeners() {
    document.removeEventListener("focusin", this.handleDocumentFocusIn);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
    unregisterDismissible(this);
    if (this.getRootNode() !== document) {
      this.getRootNode().removeEventListener("focusin", this.handleDocumentFocusIn);
    }
  }
  handleFocus() {
    this.comboboxInput.select();
  }
  handleBlur() {
    if (!this.multiple) {
      if (!this.inputValue) {
        if (this.value !== null) {
          this.selectionOrder.clear();
          this.setSelectedOptions([]);
          this.hasInteracted = true;
          this.valueHasChanged = true;
          this.updateComplete.then(() => {
            this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
          });
        }
      } else if (this.allowCustomValue) {
        const previousValue = this.value;
        this.value = this.inputValue;
        this.hasInteracted = true;
        if (this.value !== previousValue) {
          this.valueHasChanged = true;
          this.updateComplete.then(() => {
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
          });
        }
      } else if (this.selectedOptions.length > 0) {
        this.inputValue = this.selectedOptions[0].label;
      }
    }
    if (!this.open) {
      this.removeCreateOption();
    }
  }
  handleLabelClick() {
    this.comboboxInput.focus();
    this.show();
  }
  handleComboboxClick(event) {
    event.preventDefault();
  }
  handleComboboxMouseDown(event) {
    const path = event.composedPath();
    const isButton = path.some((el) => el instanceof Element && el.tagName.toLowerCase() === "wa-button");
    if (this.disabled || isButton) {
      return;
    }
    event.preventDefault();
    this.comboboxInput.focus({ preventScroll: true });
    if (!this.open && this.getVisibleOptions().length === 0 && !(this.allowCreate && this.inputValue.trim())) {
      return;
    }
    this.open = !this.open;
  }
  handleComboboxKeyDown(event) {
    event.stopPropagation();
    this.handleDocumentKeyDown(event);
  }
  handleInputChange(event) {
    event.stopPropagation();
    const input = event.target;
    this.inputValue = input.value;
    this.hasInputSinceOpening = true;
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    this.updateFilteredOptions();
    const visibleOptions = this.getVisibleOptions();
    const hasVisibleOptions = visibleOptions.length > 0;
    if (this.inputValue.length > 0) {
      if (hasVisibleOptions && !this.open) {
        this.show();
      } else if (!hasVisibleOptions && this.open) {
        this.hide();
      }
    }
    if (hasVisibleOptions && this.open) {
      this.setCurrentOption(visibleOptions[0]);
    }
    this.announceFilterResults();
  }
  handleClearClick(event) {
    event.stopPropagation();
    this.hasInteracted = true;
    if (this.value !== null || this.inputValue) {
      this.selectionOrder.clear();
      this.setSelectedOptions([]);
      this.inputValue = "";
      this.updateFilteredOptions();
      this.comboboxInput.focus({ preventScroll: true });
      this.updateComplete.then(() => {
        this.dispatchEvent(new WaClearEvent());
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
  }
  handleClearMouseDown(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  handleOptionClick(event) {
    const target = event.target;
    const option = target.closest("wa-option");
    if (option && !option.disabled) {
      if (this.handleCreateOptionSelected(option)) {
        this.updateComplete.then(() => this.comboboxInput.focus({ preventScroll: true }));
        return;
      }
      this.hasInteracted = true;
      this.valueHasChanged = true;
      if (this.multiple) {
        this.toggleOptionSelection(option);
        this.inputValue = "";
        this.updateFilteredOptions();
      } else {
        this.setSelectedOptions(option);
        this.inputValue = option.label;
      }
      this.updateComplete.then(() => this.comboboxInput.focus({ preventScroll: true }));
      this.requestUpdate("value");
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
      if (!this.multiple) {
        this.hide();
        this.comboboxInput.focus({ preventScroll: true });
      }
    }
  }
  /* @internal - used by options to update labels */
  handleDefaultSlotChange() {
    if (this.slotChangePending) return;
    this.slotChangePending = true;
    queueMicrotask(() => {
      this.slotChangePending = false;
      this.processSlotChange();
    });
  }
  processSlotChange() {
    if (!customElements.get("wa-option")) {
      customElements.whenDefined("wa-option").then(() => this.handleDefaultSlotChange());
    }
    this.cachedOptions = null;
    this.optionValues = void 0;
    const allOptions = this.getAllOptions();
    allOptions.forEach((option) => {
      if (!option.id) {
        option.id = generateOptionId();
      }
    });
    this.updateDefaultValue();
    let value = this.value;
    if (value == null || !this.valueHasChanged && !this.hasInteracted) {
      this.selectionChanged();
      if (!this.open) {
        this.updateFilteredOptions({ skipCreateOption: true });
      }
      return;
    }
    if (!Array.isArray(value)) {
      value = [value];
    }
    const selectedOptions = allOptions.filter((el) => value.includes(el.value));
    this.setSelectedOptions(selectedOptions);
    if (!this.open) {
      this.updateFilteredOptions({ skipCreateOption: true });
    }
  }
  handleTagRemove(event, directOption) {
    event.stopPropagation();
    if (this.disabled) return;
    this.hasInteracted = true;
    this.valueHasChanged = true;
    let option = directOption;
    if (!option) {
      const tagElement = event.target.closest("wa-tag[data-value]");
      if (tagElement) {
        const value = tagElement.dataset.value;
        option = this.selectedOptions.find((opt) => opt.value === value);
      }
    }
    if (option) {
      this.toggleOptionSelection(option, false);
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
  }
  // Gets an array of all `<wa-option>` elements
  getAllOptions() {
    if (this.cachedOptions) return this.cachedOptions;
    if (!this?.querySelectorAll) {
      return [];
    }
    this.cachedOptions = [...this.querySelectorAll("wa-option")];
    return this.cachedOptions;
  }
  // Gets all options excluding the synthetic create option
  getRealOptions() {
    return this.getAllOptions().filter((o4) => !o4.hasAttribute("data-create-option"));
  }
  // Creates, updates, or removes the synthetic "Create X" option based on current input
  updateCreateOption() {
    if (!this.allowCreate) {
      this.removeCreateOption();
      return;
    }
    const query = this.inputValue.trim();
    const allRealOptions = this.getRealOptions();
    const exactMatch = allRealOptions.some((option) => option.label.toLowerCase() === query.toLowerCase());
    if (query && !exactMatch) {
      if (!this.createOptionEl) {
        this.createOptionEl = document.createElement("wa-option");
        this.createOptionEl.setAttribute("data-create-option", "");
      }
      this.createOptionEl.value = query;
      this.createOptionEl.textContent = this.localize.term("createOption", query);
      this.createOptionEl.hidden = false;
      if (this.createOptionEl.parentElement !== this) {
        this.prepend(this.createOptionEl);
      }
    } else {
      this.removeCreateOption();
    }
  }
  removeCreateOption() {
    if (this.createOptionEl) {
      this.createOptionEl.remove();
      this.createOptionEl = null;
    }
  }
  // Handles selection of the synthetic create option. Returns true if it was a create option.
  handleCreateOptionSelected(option) {
    if (!option.hasAttribute("data-create-option")) {
      return false;
    }
    const inputValue = this.createOptionEl?.value || this.inputValue.trim();
    const createEvent = new WaCreateEvent({ inputValue });
    this.dispatchEvent(createEvent);
    if (createEvent.defaultPrevented) {
      this.removeCreateOption();
      return true;
    }
    this.removeCreateOption();
    const newOption = document.createElement("wa-option");
    newOption.value = inputValue;
    newOption.textContent = inputValue;
    this.prepend(newOption);
    this.cachedOptions = null;
    this.optionValues = void 0;
    this.hasInteracted = true;
    this.valueHasChanged = true;
    if (this.multiple) {
      this.toggleOptionSelection(newOption, true);
      this.inputValue = "";
      this.updateFilteredOptions();
      this.setCurrentOption(newOption);
    } else {
      this.setSelectedOptions(newOption);
      this.inputValue = inputValue;
    }
    this.updateComplete.then(() => {
      this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
    if (!this.multiple) {
      this.hide();
      this.comboboxInput.focus({ preventScroll: true });
    }
    return true;
  }
  // Gets visible (filtered) options
  getVisibleOptions() {
    const isFiltering = !!this.inputValue && this.hasInputSinceOpening;
    if (!isFiltering) {
      return this.getAllOptions().filter((option) => !option.disabled);
    }
    return this.filteredOptions.filter((option) => !option.disabled);
  }
  // Gets the first visible option
  getFirstVisibleOption() {
    return this.getVisibleOptions()[0];
  }
  // Update the filtered options based on input value. When called from slotchange, skipCreateOption
  // prevents infinite loops (updateCreateOption mutates DOM → triggers slotchange → updateFilteredOptions).
  updateFilteredOptions({ skipCreateOption = false } = {}) {
    const allOptions = this.getAllOptions();
    const isFiltering = !!this.inputValue && this.hasInputSinceOpening;
    this.querySelectorAll(":scope > :not(wa-option)").forEach((el) => {
      el.hidden = isFiltering;
    });
    if (!isFiltering) {
      this.filteredOptions = allOptions;
      allOptions.forEach((option) => {
        option.hidden = false;
      });
      if (!skipCreateOption) {
        this.updateCreateOption();
      }
      if (this.createOptionEl && !this.createOptionEl.hidden) {
        this.filteredOptions.unshift(this.createOptionEl);
      }
      return;
    }
    const query = this.inputValue.toLowerCase();
    this.filteredOptions = allOptions.filter((option) => {
      if (option.hasAttribute("data-create-option")) {
        return false;
      }
      let matches;
      if (this.filter) {
        matches = this.filter(option, this.inputValue);
      } else {
        matches = option.label.toLowerCase().includes(query);
      }
      option.hidden = !matches;
      return matches;
    });
    this.querySelectorAll(":scope > :not(wa-option):not(wa-divider)").forEach((label) => {
      let hasVisibleOption = false;
      let sibling = label.nextElementSibling;
      while (sibling) {
        if (!sibling.matches("wa-option") && !sibling.matches("wa-divider")) break;
        if (sibling.matches("wa-option") && !sibling.hidden) {
          hasVisibleOption = true;
          break;
        }
        sibling = sibling.nextElementSibling;
      }
      label.hidden = !hasVisibleOption;
    });
    this.querySelectorAll(":scope > wa-divider").forEach((divider) => {
      let hasVisibleBefore = false;
      let hasVisibleAfter = false;
      let sibling = divider.previousElementSibling;
      while (sibling) {
        if (sibling.matches("wa-option") && !sibling.hidden) {
          hasVisibleBefore = true;
          break;
        }
        sibling = sibling.previousElementSibling;
      }
      sibling = divider.nextElementSibling;
      while (sibling) {
        if (sibling.matches("wa-option") && !sibling.hidden) {
          hasVisibleAfter = true;
          break;
        }
        sibling = sibling.nextElementSibling;
      }
      divider.hidden = !hasVisibleBefore || !hasVisibleAfter;
    });
    if (!skipCreateOption) {
      this.updateCreateOption();
    }
    if (this.createOptionEl && !this.createOptionEl.hidden) {
      this.filteredOptions.unshift(this.createOptionEl);
    }
  }
  // Sets the current option, which is the option the user is currently interacting with (e.g. via keyboard). Only one
  // option may be "current" at a time. Uses aria-activedescendant pattern.
  setCurrentOption(option) {
    const allOptions = this.getAllOptions();
    allOptions.forEach((el) => {
      el.current = false;
      el.tabIndex = -1;
    });
    if (option) {
      this.currentOption = option;
      option.current = true;
      option.tabIndex = 0;
      if (option.id) {
        this.comboboxInput?.setAttribute("aria-activedescendant", option.id);
      }
      scrollIntoView(option, this.listbox, "vertical", "auto");
    } else {
      this.comboboxInput?.removeAttribute("aria-activedescendant");
    }
  }
  // Sets the selected option(s)
  setSelectedOptions(option) {
    const allOptions = this.getAllOptions();
    const newSelectedOptions = Array.isArray(option) ? option : [option];
    allOptions.forEach((el) => {
      if (newSelectedOptions.includes(el)) {
        return;
      }
      el.selected = false;
    });
    if (newSelectedOptions.length) {
      newSelectedOptions.forEach((el) => el.selected = true);
    }
    this.selectionChanged();
  }
  // Toggles an option's selected state
  toggleOptionSelection(option, force) {
    if (force === true || force === false) {
      option.selected = force;
    } else {
      option.selected = !option.selected;
    }
    this.selectionChanged();
  }
  // Announce option to screen readers via live region
  announceOption(option) {
    if (this.liveRegion) {
      const position = this.getVisibleOptions().indexOf(option) + 1;
      const total = this.getVisibleOptions().length;
      this.liveRegion.textContent = `${option.label}, ${position} of ${total}`;
    }
  }
  // Announce filter results to screen readers
  announceFilterResults() {
    if (this.liveRegion) {
      const count = this.getVisibleOptions().length;
      if (count === 0) {
        this.liveRegion.textContent = this.localize.term("numOptionsSelected", 0) || "No options available";
      } else {
        this.liveRegion.textContent = `${count} option${count === 1 ? "" : "s"} available`;
      }
    }
  }
  // @internal This method must be called whenever the selection changes. It will update the selected options cache, the
  // current value, and the display value. The option component uses it internally to update labels as they change.
  selectionChanged() {
    const options = this.getAllOptions();
    const newSelectedOptions = options.filter((el) => {
      if (!this.hasInteracted && !this.valueHasChanged) {
        const defaultValue = this.defaultValue;
        const defaultValues = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
        return el.hasAttribute("selected") || el.defaultSelected || el.selected || defaultValues?.includes(el.value);
      }
      return el.selected;
    });
    const newSelectedValues = new Set(newSelectedOptions.map((el) => el.value));
    for (const value of this.selectionOrder.keys()) {
      if (!newSelectedValues.has(value)) {
        this.selectionOrder.delete(value);
      }
    }
    const maxOrder = this.selectionOrder.size > 0 ? Math.max(...this.selectionOrder.values()) : -1;
    let nextOrder = maxOrder + 1;
    for (const option of newSelectedOptions) {
      if (!this.selectionOrder.has(option.value)) {
        this.selectionOrder.set(option.value, nextOrder++);
      }
    }
    this.selectedOptions = newSelectedOptions.sort((a, b) => {
      const orderA = this.selectionOrder.get(a.value) ?? 0;
      const orderB = this.selectionOrder.get(b.value) ?? 0;
      return orderA - orderB;
    });
    let selectedValues = new Set(this.selectedOptions.map((el) => el.value));
    if (selectedValues.size > 0 || this._value) {
      const oldValue = this._value;
      if (this._value == null) {
        let value = this.defaultValue ?? [];
        this._value = Array.isArray(value) ? value : [value];
      }
      this._value = this._value?.filter((value) => !this.optionValues?.has(value)) ?? null;
      this._value?.unshift(...selectedValues);
      this.requestUpdate("value", oldValue);
    }
    if (!this.multiple && this.selectedOptions.length > 0) {
      const isInputFocused = this.comboboxInput && this.matches(":focus-within");
      if (!this.hasInteracted || !this.inputValue && !isInputFocused) {
        this.inputValue = this.selectedOptions[0].label;
      }
    }
    this.updateComplete.then(() => {
      this.updateValidity();
    });
  }
  get tags() {
    return this.selectedOptions.map((option, index) => {
      if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
        const tag = this.getTag(option, index);
        if (!tag) return null;
        return typeof tag === "string" ? o3(tag) : tag;
      } else if (index === this.maxOptionsVisible) {
        return x`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            ?pill=${this.pill}
            size=${this.size}
            >+${this.selectedOptions.length - index}</wa-tag
          >
        `;
      }
      return null;
    });
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("value")) {
      this.customStates.set("blank", !this.value);
    }
    if (changedProperties.has("disabled")) {
      this.customStates.set("disabled", this.disabled);
    }
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.open = false;
    }
  }
  handleValueChange() {
    const allOptions = this.getAllOptions();
    const value = Array.isArray(this.value) ? this.value : [this.value];
    const selectedOptions = allOptions.filter((el) => value.includes(el.value));
    this.setSelectedOptions(selectedOptions);
    this.updateValidity();
  }
  async handleOpenChange() {
    if (this.open && !this.disabled) {
      this.hasInputSinceOpening = false;
      this.setCurrentOption(this.selectedOptions[0] || this.getFirstVisibleOption());
      this.updateFilteredOptions();
      const waShowEvent = new WaShowEvent();
      this.dispatchEvent(waShowEvent);
      if (waShowEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      this.addOpenListeners();
      this.listbox.hidden = false;
      this.popup.active = true;
      requestAnimationFrame(() => {
        this.setCurrentOption(this.currentOption);
      });
      await animateWithClass(this.popup.popup, "show");
      if (this.currentOption) {
        scrollIntoView(this.currentOption, this.listbox, "vertical", "auto");
      }
      this.announceFilterResults();
      this.dispatchEvent(new WaAfterShowEvent());
    } else {
      const waHideEvent = new WaHideEvent();
      this.dispatchEvent(waHideEvent);
      if (waHideEvent.defaultPrevented) {
        this.open = true;
        return;
      }
      this.removeOpenListeners();
      await animateWithClass(this.popup.popup, "hide");
      this.listbox.hidden = true;
      this.popup.active = false;
      this.comboboxInput?.removeAttribute("aria-activedescendant");
      this.removeCreateOption();
      this.dispatchEvent(new WaAfterHideEvent());
    }
  }
  /** Shows the listbox. */
  async show() {
    if (this.open || this.disabled) {
      this.open = false;
      return void 0;
    }
    if (this.getVisibleOptions().length === 0 && !(this.allowCreate && this.inputValue.trim())) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "wa-after-show");
  }
  /** Hides the listbox. */
  async hide() {
    if (!this.open || this.disabled) {
      this.open = false;
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "wa-after-hide");
  }
  /** Sets focus on the control. */
  focus(options) {
    this.comboboxInput.focus(options);
  }
  /** Removes focus from the control. */
  blur() {
    this.comboboxInput.blur();
  }
  formResetCallback() {
    this.selectionOrder.clear();
    this.value = this.defaultValue;
    super.formResetCallback();
    this.handleValueChange();
    if (!this.multiple && this.selectedOptions.length > 0) {
      this.inputValue = this.selectedOptions[0].label;
    } else {
      this.inputValue = "";
    }
    this.updateComplete.then(() => {
      this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }
  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test("label") : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test("hint") : this.withHint;
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const hasClearIcon = (this.hasUpdated || o) && this.withClear && !this.disabled && (this.value && (Array.isArray(this.value) ? this.value.length > 0 : true) || this.inputValue);
    return x`
      <div
        part="form-control"
        class=${e2({
      "form-control": true,
      "form-control-has-label": hasLabel
    })}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${e2({
      label: true,
      "has-label": hasLabel
    })}
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${e2({
      "combobox-popup": true,
      open: this.open,
      disabled: this.disabled,
      enabled: !this.disabled,
      multiple: this.multiple
    })}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              ${this.multiple && this.hasUpdated ? x`
                    <div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>
                      ${this.tags}
                      <input
                        part="combobox-input"
                        class="combobox-input"
                        type="text"
                        placeholder=${this.placeholder}
                        .disabled=${this.disabled}
                        .value=${this.inputValue}
                        ?required=${this.required}
                        autocomplete="off"
                        autocapitalize=${o2(this.autocapitalize)}
                        autocorrect=${this.autocorrect ? "on" : "off"}
                        spellcheck=${this.spellcheck}
                        inputmode=${o2(this.inputmode)}
                        enterkeyhint=${o2(this.enterkeyhint)}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-controls=${this.listboxId}
                        aria-expanded=${this.open ? "true" : "false"}
                        aria-haspopup="listbox"
                        aria-labelledby="label"
                        aria-disabled=${this.disabled ? "true" : "false"}
                        aria-describedby="hint"
                        aria-invalid=${!this.validity.valid}
                        tabindex="0"
                        @input=${this.handleInputChange}
                        @focus=${this.handleFocus}
                        @blur=${this.handleBlur}
                      />
                    </div>
                  ` : x`
                    <input
                      part="combobox-input"
                      class="combobox-input"
                      type="text"
                      placeholder=${this.placeholder}
                      .disabled=${this.disabled}
                      .value=${this.inputValue}
                      ?required=${this.required}
                      autocomplete="off"
                      autocapitalize=${o2(this.autocapitalize)}
                      autocorrect=${this.autocorrect ? "on" : "off"}
                      spellcheck=${this.spellcheck}
                      inputmode=${o2(this.inputmode)}
                      enterkeyhint=${o2(this.enterkeyhint)}
                      role="combobox"
                      aria-autocomplete="list"
                      aria-controls=${this.listboxId}
                      aria-expanded=${this.open ? "true" : "false"}
                      aria-haspopup="listbox"
                      aria-labelledby="label"
                      aria-disabled=${this.disabled ? "true" : "false"}
                      aria-describedby="hint"
                      aria-invalid=${!this.validity.valid}
                      tabindex="0"
                      @input=${this.handleInputChange}
                      @focus=${this.handleFocus}
                      @blur=${this.handleBlur}
                    />
                  `}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value) ? this.value.join(", ") : this.value ?? ""}
                tabindex="-1"
                aria-hidden="true"
                @focus=${() => this.focus()}
              />

              ${hasClearIcon ? x`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  ` : E}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id=${this.listboxId}
              role="listbox"
              aria-expanded=${this.open ? "true" : "false"}
              aria-multiselectable=${this.multiple ? "true" : "false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>

          <!-- Live region for screen reader announcements -->
          <div class="live-region" aria-live="polite" aria-atomic="true"></div>
        </div>

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
      </div>
    `;
  }
};
WaCombobox.css = [combobox_styles_default, form_control_styles_default, size_styles_default];
__decorateClass([
  e(".combobox-popup")
], WaCombobox.prototype, "popup", 2);
__decorateClass([
  e(".combobox")
], WaCombobox.prototype, "combobox", 2);
__decorateClass([
  e(".combobox-input")
], WaCombobox.prototype, "comboboxInput", 2);
__decorateClass([
  e(".value-input")
], WaCombobox.prototype, "valueInput", 2);
__decorateClass([
  e(".listbox")
], WaCombobox.prototype, "listbox", 2);
__decorateClass([
  e(".live-region")
], WaCombobox.prototype, "liveRegion", 2);
__decorateClass([
  r()
], WaCombobox.prototype, "currentOption", 2);
__decorateClass([
  r()
], WaCombobox.prototype, "selectedOptions", 2);
__decorateClass([
  r()
], WaCombobox.prototype, "optionValues", 2);
__decorateClass([
  r()
], WaCombobox.prototype, "filteredOptions", 2);
__decorateClass([
  r()
], WaCombobox.prototype, "inputValue", 2);
__decorateClass([
  n({ reflect: true })
], WaCombobox.prototype, "name", 2);
__decorateClass([
  n({
    attribute: false
  })
], WaCombobox.prototype, "defaultValue", 1);
__decorateClass([
  n({ attribute: "value", reflect: false })
], WaCombobox.prototype, "value", 1);
__decorateClass([
  n({ reflect: true })
], WaCombobox.prototype, "size", 2);
__decorateClass([
  n()
], WaCombobox.prototype, "placeholder", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaCombobox.prototype, "multiple", 2);
__decorateClass([
  n({ attribute: "max-options-visible", type: Number })
], WaCombobox.prototype, "maxOptionsVisible", 2);
__decorateClass([
  n({ type: Boolean })
], WaCombobox.prototype, "disabled", 2);
__decorateClass([
  n({ attribute: "with-clear", type: Boolean })
], WaCombobox.prototype, "withClear", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaCombobox.prototype, "open", 2);
__decorateClass([
  n({ reflect: true })
], WaCombobox.prototype, "appearance", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaCombobox.prototype, "pill", 2);
__decorateClass([
  n()
], WaCombobox.prototype, "label", 2);
__decorateClass([
  n({ reflect: true })
], WaCombobox.prototype, "placement", 2);
__decorateClass([
  n({ attribute: "hint" })
], WaCombobox.prototype, "hint", 2);
__decorateClass([
  n({ attribute: "with-label", type: Boolean })
], WaCombobox.prototype, "withLabel", 2);
__decorateClass([
  n({ attribute: "with-hint", type: Boolean })
], WaCombobox.prototype, "withHint", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaCombobox.prototype, "required", 2);
__decorateClass([
  n({ attribute: "allow-custom-value", type: Boolean })
], WaCombobox.prototype, "allowCustomValue", 2);
__decorateClass([
  n({ attribute: "allow-create", type: Boolean })
], WaCombobox.prototype, "allowCreate", 2);
__decorateClass([
  n({ attribute: false })
], WaCombobox.prototype, "filter", 2);
__decorateClass([
  n()
], WaCombobox.prototype, "autocapitalize", 2);
__decorateClass([
  n({
    type: Boolean,
    converter: {
      fromAttribute: (value) => !value || value === "off" ? false : true,
      toAttribute: (value) => value ? "on" : "off"
    }
  })
], WaCombobox.prototype, "autocorrect", 2);
__decorateClass([
  n()
], WaCombobox.prototype, "inputmode", 2);
__decorateClass([
  n()
], WaCombobox.prototype, "enterkeyhint", 2);
__decorateClass([
  n({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], WaCombobox.prototype, "spellcheck", 2);
__decorateClass([
  n({ attribute: false })
], WaCombobox.prototype, "getTag", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], WaCombobox.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], WaCombobox.prototype, "handleValueChange", 1);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], WaCombobox.prototype, "handleOpenChange", 1);
WaCombobox = __decorateClass([
  t("wa-combobox")
], WaCombobox);

export {
  WaCombobox
};
