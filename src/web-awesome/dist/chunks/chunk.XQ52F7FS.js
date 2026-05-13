/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  LocalizeController
} from "./chunk.OK6DMFIY.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/format-number/format-number.ts
import { customElement, property } from "lit/decorators.js";
var WaFormatNumber = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.type = "decimal";
    this.withoutGrouping = false;
    this.currency = "USD";
    this.currencyDisplay = "symbol";
  }
  static get styles() {
    return [];
  }
  render() {
    if (isNaN(this.value)) {
      return "";
    }
    return this.localize.number(this.value, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: !this.withoutGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits
    });
  }
};
__decorateClass([
  property({ type: Number })
], WaFormatNumber.prototype, "value", 2);
__decorateClass([
  property()
], WaFormatNumber.prototype, "type", 2);
__decorateClass([
  property({ attribute: "without-grouping", type: Boolean })
], WaFormatNumber.prototype, "withoutGrouping", 2);
__decorateClass([
  property()
], WaFormatNumber.prototype, "currency", 2);
__decorateClass([
  property({ attribute: "currency-display" })
], WaFormatNumber.prototype, "currencyDisplay", 2);
__decorateClass([
  property({ attribute: "minimum-integer-digits", type: Number })
], WaFormatNumber.prototype, "minimumIntegerDigits", 2);
__decorateClass([
  property({ attribute: "minimum-fraction-digits", type: Number })
], WaFormatNumber.prototype, "minimumFractionDigits", 2);
__decorateClass([
  property({ attribute: "maximum-fraction-digits", type: Number })
], WaFormatNumber.prototype, "maximumFractionDigits", 2);
__decorateClass([
  property({ attribute: "minimum-significant-digits", type: Number })
], WaFormatNumber.prototype, "minimumSignificantDigits", 2);
__decorateClass([
  property({ attribute: "maximum-significant-digits", type: Number })
], WaFormatNumber.prototype, "maximumSignificantDigits", 2);
WaFormatNumber = __decorateClass([
  customElement("wa-format-number")
], WaFormatNumber);

export {
  WaFormatNumber
};
