/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaChart
} from "./chunk.NJHAURDV.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/line-chart/line-chart.ts
import { customElement, property } from "lit/decorators.js";
var WaLineChart = class extends WaChart {
  constructor() {
    super(...arguments);
    this.type = "line";
  }
};
__decorateClass([
  property()
], WaLineChart.prototype, "type", 2);
WaLineChart = __decorateClass([
  customElement("wa-line-chart")
], WaLineChart);

export {
  WaLineChart
};
