/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  parseSpaceDelimitedTokens
} from "./chunk.TW3VXPTP.js";
import {
  drawer_styles_default
} from "./chunk.XB2RA4JJ.js";
import {
  lockBodyScrolling,
  unlockBodyScrolling
} from "./chunk.HQKLFGS3.js";
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
  isTopDismissible,
  registerDismissible,
  unregisterDismissible
} from "./chunk.EXBMUNXF.js";
import {
  animateWithClass
} from "./chunk.ZRLIH7NU.js";
import {
  HasSlotController
} from "./chunk.ROLIHZR6.js";
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
  t
} from "./chunk.JB4GDECI.js";
import {
  o
} from "./chunk.7OBLIRXR.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/drawer/drawer.ts
var WaDrawer = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.hasSlotController = new HasSlotController(this, "footer", "header-actions", "label");
    this.open = false;
    this.label = "";
    this.placement = "end";
    this.withoutHeader = false;
    this.lightDismiss = true;
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.requestClose(this.drawer);
      }
    };
  }
  firstUpdated() {
    if (o) {
      return;
    }
    if (this.open) {
      this.addOpenListeners();
      this.drawer.showModal();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
    this.removeOpenListeners();
  }
  async requestClose(source) {
    const waHideEvent = new WaHideEvent({ source });
    this.dispatchEvent(waHideEvent);
    if (waHideEvent.defaultPrevented) {
      this.open = true;
      animateWithClass(this.drawer, "pulse");
      return;
    }
    this.removeOpenListeners();
    await animateWithClass(this.drawer, "hide");
    this.open = false;
    this.drawer.close();
    unlockBodyScrolling(this);
    const trigger = this.originalTrigger;
    if (typeof trigger?.focus === "function") {
      setTimeout(() => trigger.focus());
    }
    this.dispatchEvent(new WaAfterHideEvent());
  }
  addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    registerDismissible(this);
  }
  removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    unregisterDismissible(this);
  }
  handleDialogCancel(event) {
    event.preventDefault();
    if (!this.drawer.classList.contains("hide") && event.target === this.drawer && isTopDismissible(this)) {
      this.requestClose(this.drawer);
    }
  }
  handleDialogClick(event) {
    const target = event.target;
    const button = target.closest('[data-drawer="close"]');
    if (button) {
      event.stopPropagation();
      this.requestClose(button);
    }
  }
  async handleDialogPointerDown(event) {
    if (event.target === this.drawer) {
      if (this.lightDismiss) {
        this.requestClose(this.drawer);
      } else {
        await animateWithClass(this.drawer, "pulse");
      }
    }
  }
  handleOpenChange() {
    if (this.open && !this.drawer.open) {
      this.show();
    } else if (this.drawer.open) {
      this.open = true;
      this.requestClose(this.drawer);
    }
  }
  /** Shows the drawer. */
  async show() {
    const waShowEvent = new WaShowEvent();
    this.dispatchEvent(waShowEvent);
    if (waShowEvent.defaultPrevented) {
      this.open = false;
      return;
    }
    this.addOpenListeners();
    this.originalTrigger = document.activeElement;
    this.open = true;
    this.drawer.showModal();
    lockBodyScrolling(this);
    requestAnimationFrame(() => {
      const elementToFocus = this.querySelector("[autofocus]");
      if (elementToFocus && typeof elementToFocus.focus === "function") {
        elementToFocus.focus();
      } else {
        this.drawer.focus();
      }
    });
    await animateWithClass(this.drawer, "show");
    this.dispatchEvent(new WaAfterShowEvent());
  }
  render() {
    const hasHeader = !this.withoutHeader;
    const hasFooter = this.hasSlotController.test("footer");
    return x`
      <dialog
        part="dialog"
        class=${e2({
      drawer: true,
      open: this.open,
      top: this.placement === "top",
      end: this.placement === "end",
      bottom: this.placement === "bottom",
      start: this.placement === "start"
    })}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${hasHeader ? x`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(8203)} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${(event) => this.requestClose(event.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            ` : ""}

        <div part="body" class="body"><slot></slot></div>

        ${hasFooter ? x`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            ` : ""}
      </dialog>
    `;
  }
};
WaDrawer.css = drawer_styles_default;
__decorateClass([
  e(".drawer")
], WaDrawer.prototype, "drawer", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaDrawer.prototype, "open", 2);
__decorateClass([
  n({ reflect: true })
], WaDrawer.prototype, "label", 2);
__decorateClass([
  n({ reflect: true })
], WaDrawer.prototype, "placement", 2);
__decorateClass([
  n({ attribute: "without-header", type: Boolean, reflect: true })
], WaDrawer.prototype, "withoutHeader", 2);
__decorateClass([
  n({ attribute: "light-dismiss", type: Boolean })
], WaDrawer.prototype, "lightDismiss", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], WaDrawer.prototype, "handleOpenChange", 1);
WaDrawer = __decorateClass([
  t("wa-drawer")
], WaDrawer);
if (!o) {
  document.addEventListener("click", (event) => {
    const drawerAttrEl = event.target.closest("[data-drawer]");
    if (drawerAttrEl instanceof Element) {
      const [command, id] = parseSpaceDelimitedTokens(drawerAttrEl.getAttribute("data-drawer") || "");
      if (command === "open" && id?.length) {
        const doc = drawerAttrEl.getRootNode();
        const drawer = doc.getElementById(id);
        if (drawer?.localName === "wa-drawer") {
          drawer.open = true;
        } else {
          console.warn(`A drawer with an ID of "${id}" could not be found in this document.`);
        }
      }
    }
  });
  document.body.addEventListener("pointerdown", () => {
  });
}

export {
  WaDrawer
};
