/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaChart
} from "./chunk.NJHAURDV.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/scatter-chart/scatter-chart.ts
import { customElement, property } from "lit/decorators.js";
var WaScatterChart = class extends WaChart {
  constructor() {
    super(...arguments);
    this.type = "scatter";
  }
};
__decorateClass([
  property()
], WaScatterChart.prototype, "type", 2);
WaScatterChart = __decorateClass([
  customElement("wa-scatter-chart")
], WaScatterChart);

export {
  WaScatterChart
};
