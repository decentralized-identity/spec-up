/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaLazyChangeEvent
} from "./chunk.TUV2WYU2.js";
import {
  WaLazyLoadEvent
} from "./chunk.FI44DRP3.js";
import {
  WaExpandEvent
} from "./chunk.UTOH2EF5.js";
import {
  WaCollapseEvent
} from "./chunk.64JGURBO.js";
import {
  WaAfterCollapseEvent
} from "./chunk.EYH7NHWV.js";
import {
  WaAfterExpandEvent
} from "./chunk.R2XBLAWK.js";
import {
  tree_item_styles_default
} from "./chunk.ZWPKOU7C.js";
import {
  l
} from "./chunk.KZZR6Z6I.js";
import {
  animate,
  parseDuration
} from "./chunk.ZRLIH7NU.js";
import {
  e as e2
} from "./chunk.KWDPKKFO.js";
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
  t
} from "./chunk.JB4GDECI.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// ../../node_modules/lit-html/directives/when.js
function n2(n3, r2, t2) {
  return n3 ? r2(n3) : t2?.(n3);
}

// _bundle_/src/components/tree-item/tree-item.ts
var WaTreeItem = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.indeterminate = false;
    this.isLeaf = false;
    this.loading = false;
    this.selectable = false;
    this.expanded = false;
    this.selected = false;
    this.disabled = false;
    this.lazy = false;
  }
  static isTreeItem(node) {
    return node instanceof Element && node.getAttribute("role") === "treeitem";
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "treeitem");
    this.setAttribute("tabindex", "-1");
    if (this.isNestedItem()) {
      this.slot = "children";
    }
    this.updateIndentation();
  }
  firstUpdated() {
    this.childrenContainer.hidden = !this.expanded;
    this.childrenContainer.style.height = this.expanded ? "auto" : "0";
    this.isLeaf = !this.lazy && this.getChildrenItems().length === 0;
    this.handleExpandedChange();
  }
  async animateCollapse() {
    this.dispatchEvent(new WaCollapseEvent());
    const duration = parseDuration(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));
    await animate(
      this.childrenContainer,
      [
        // We can't animate from 'auto', so use the scroll height for now
        { height: `${this.childrenContainer.scrollHeight}px`, opacity: "1", overflow: "hidden" },
        { height: "0", opacity: "0", overflow: "hidden" }
      ],
      { duration, easing: "cubic-bezier(0.4, 0.0, 0.2, 1)" }
    );
    this.childrenContainer.hidden = true;
    this.dispatchEvent(new WaAfterCollapseEvent());
  }
  // Checks whether the item is nested into an item
  isNestedItem() {
    const parent = this.parentElement;
    return !!parent && WaTreeItem.isTreeItem(parent);
  }
  /** Counts the nesting depth and sets the private --indent property on the host for indentation. */
  updateIndentation() {
    let depth = 0;
    let node = this.parentElement;
    while (node) {
      if (WaTreeItem.isTreeItem(node)) {
        depth++;
      }
      node = node.parentElement;
    }
    this.style.setProperty("--indent", `calc(${depth} * var(--indent-size, 2em))`);
  }
  handleChildrenSlotChange() {
    this.loading = false;
    this.isLeaf = !this.lazy && this.getChildrenItems().length === 0;
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("selected") && !changedProperties.has("indeterminate")) {
      this.indeterminate = false;
    }
  }
  async animateExpand() {
    this.dispatchEvent(new WaExpandEvent());
    this.childrenContainer.hidden = false;
    const duration = parseDuration(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));
    await animate(
      this.childrenContainer,
      [
        { height: "0", opacity: "0", overflow: "hidden" },
        { height: `${this.childrenContainer.scrollHeight}px`, opacity: "1", overflow: "hidden" }
      ],
      {
        duration,
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
      }
    );
    this.childrenContainer.style.height = "auto";
    this.dispatchEvent(new WaAfterExpandEvent());
  }
  handleLoadingChange() {
    this.setAttribute("aria-busy", this.loading ? "true" : "false");
    if (!this.loading) {
      this.animateExpand();
    }
  }
  handleDisabledChange() {
    this.customStates.set("disabled", this.disabled);
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleExpandedState() {
    this.customStates.set("expanded", this.expanded);
  }
  handleIndeterminateStateChange() {
    this.customStates.set("indeterminate", this.indeterminate);
  }
  handleSelectedChange() {
    this.customStates.set("selected", this.selected);
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
  }
  handleExpandedChange() {
    if (!this.isLeaf) {
      this.setAttribute("aria-expanded", this.expanded ? "true" : "false");
    } else {
      this.removeAttribute("aria-expanded");
    }
  }
  handleExpandAnimation() {
    if (this.expanded) {
      if (this.lazy) {
        this.loading = true;
        this.dispatchEvent(new WaLazyLoadEvent());
      } else {
        this.animateExpand();
      }
    } else {
      this.animateCollapse();
    }
  }
  handleLazyChange() {
    this.dispatchEvent(new WaLazyChangeEvent());
  }
  /** Gets all the nested tree items in this node. */
  getChildrenItems({ includeDisabled = true } = {}) {
    return this.childrenSlot ? [...this.childrenSlot.assignedElements({ flatten: true })].filter(
      (item) => WaTreeItem.isTreeItem(item) && (includeDisabled || !item.disabled)
    ) : [];
  }
  render() {
    const isRtl = this.localize.dir() === "rtl";
    const showExpandButton = !this.loading && (!this.isLeaf || this.lazy);
    return x`
      <div
        part="base"
        class="${e2({
      "tree-item": true,
      "tree-item-expanded": this.expanded,
      "tree-item-selected": this.selected,
      "tree-item-leaf": this.isLeaf,
      "tree-item-loading": this.loading,
      "tree-item-has-expand-button": showExpandButton
    })}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${e2({
      "expand-button": true,
      "expand-button-visible": showExpandButton
    })}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${n2(
      this.loading,
      () => x` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,
      () => x`
                  <wa-icon name=${isRtl ? "chevron-left" : "chevron-right"} library="system" variant="solid"></wa-icon>
                `
    )}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${isRtl ? "chevron-left" : "chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${n2(
      this.selectable,
      () => x`
              <wa-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="checkbox"
                ?disabled="${this.disabled}"
                ?checked="${l(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></wa-checkbox>
            `
    )}

          <slot class="label" part="label"></slot>
        </div>

        <div class="children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `;
  }
};
WaTreeItem.css = tree_item_styles_default;
__decorateClass([
  r()
], WaTreeItem.prototype, "indeterminate", 2);
__decorateClass([
  r()
], WaTreeItem.prototype, "isLeaf", 2);
__decorateClass([
  r()
], WaTreeItem.prototype, "loading", 2);
__decorateClass([
  r()
], WaTreeItem.prototype, "selectable", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaTreeItem.prototype, "expanded", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaTreeItem.prototype, "selected", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaTreeItem.prototype, "disabled", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaTreeItem.prototype, "lazy", 2);
__decorateClass([
  e("slot:not([name])")
], WaTreeItem.prototype, "defaultSlot", 2);
__decorateClass([
  e("slot[name=children]")
], WaTreeItem.prototype, "childrenSlot", 2);
__decorateClass([
  e(".item")
], WaTreeItem.prototype, "itemElement", 2);
__decorateClass([
  e(".children")
], WaTreeItem.prototype, "childrenContainer", 2);
__decorateClass([
  e(".expand-button slot")
], WaTreeItem.prototype, "expandButtonSlot", 2);
__decorateClass([
  watch("loading", { waitUntilFirstUpdate: true })
], WaTreeItem.prototype, "handleLoadingChange", 1);
__decorateClass([
  watch("disabled")
], WaTreeItem.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("expanded")
], WaTreeItem.prototype, "handleExpandedState", 1);
__decorateClass([
  watch("indeterminate")
], WaTreeItem.prototype, "handleIndeterminateStateChange", 1);
__decorateClass([
  watch("selected")
], WaTreeItem.prototype, "handleSelectedChange", 1);
__decorateClass([
  watch("expanded", { waitUntilFirstUpdate: true })
], WaTreeItem.prototype, "handleExpandedChange", 1);
__decorateClass([
  watch("expanded", { waitUntilFirstUpdate: true })
], WaTreeItem.prototype, "handleExpandAnimation", 1);
__decorateClass([
  watch("lazy", { waitUntilFirstUpdate: true })
], WaTreeItem.prototype, "handleLazyChange", 1);
WaTreeItem = __decorateClass([
  t("wa-tree-item")
], WaTreeItem);

export {
  WaTreeItem
};
/*! Bundled license information:

lit-html/directives/when.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
