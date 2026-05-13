/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaChart
} from "./chunk.NJHAURDV.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/pie-chart/pie-chart.ts
import { customElement, property } from "lit/decorators.js";
var WaPieChart = class extends WaChart {
  constructor() {
    super(...arguments);
    this.type = "pie";
  }
};
__decorateClass([
  property()
], WaPieChart.prototype, "type", 2);
WaPieChart = __decorateClass([
  customElement("wa-pie-chart")
], WaPieChart);

export {
  WaPieChart
};
