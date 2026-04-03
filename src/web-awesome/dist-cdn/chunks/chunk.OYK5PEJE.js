/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  spinner_styles_default
} from "./chunk.4O3QP3ZU.js";
import {
  LocalizeController
} from "./chunk.5EW4WF6V.js";
import {
  WebAwesomeElement,
  t
} from "./chunk.JB4GDECI.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/spinner/spinner.ts
var WaSpinner = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
  }
  render() {
    return x`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle class="indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    `;
  }
};
WaSpinner.css = spinner_styles_default;
WaSpinner = __decorateClass([
  t("wa-spinner")
], WaSpinner);

export {
  WaSpinner
};
