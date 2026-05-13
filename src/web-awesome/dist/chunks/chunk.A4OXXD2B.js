/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  progress_bar_styles_default
} from "./chunk.3ORVSTUO.js";
import {
  clamp
} from "./chunk.4SJJHQXE.js";
import {
  LocalizeController
} from "./chunk.OK6DMFIY.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/progress-bar/progress-bar.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
var WaProgressBar = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.indeterminate = false;
    this.label = "";
  }
  updated(changedProperties) {
    if (changedProperties.has("value")) {
      requestAnimationFrame(() => {
        this.style.setProperty("--percentage", `${clamp(this.value, 0, 100)}%`);
      });
    }
  }
  render() {
    return html`
      <div
        part="base"
        class="progress-bar"
        role="progressbar"
        title=${ifDefined(this.title)}
        aria-label=${this.label.length > 0 ? this.label : this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate ? "0" : this.value}
      >
        <div part="indicator" class="indicator">
          ${!this.indeterminate ? html` <slot part="label" class="label"></slot> ` : ""}
        </div>
      </div>
    `;
  }
};
WaProgressBar.css = progress_bar_styles_default;
__decorateClass([
  property({ type: Number, reflect: true })
], WaProgressBar.prototype, "value", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaProgressBar.prototype, "indeterminate", 2);
__decorateClass([
  property()
], WaProgressBar.prototype, "label", 2);
WaProgressBar = __decorateClass([
  customElement("wa-progress-bar")
], WaProgressBar);

export {
  WaProgressBar
};
