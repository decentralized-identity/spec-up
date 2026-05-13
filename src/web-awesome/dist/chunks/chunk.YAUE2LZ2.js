/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaChart
} from "./chunk.NJHAURDV.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/bubble-chart/bubble-chart.ts
import { customElement, property } from "lit/decorators.js";
var WaBubbleChart = class extends WaChart {
  constructor() {
    super(...arguments);
    this.type = "bubble";
  }
};
__decorateClass([
  property()
], WaBubbleChart.prototype, "type", 2);
WaBubbleChart = __decorateClass([
  customElement("wa-bubble-chart")
], WaBubbleChart);

export {
  WaBubbleChart
};
