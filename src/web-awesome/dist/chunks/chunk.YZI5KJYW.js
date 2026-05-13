/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaChart
} from "./chunk.NJHAURDV.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/radar-chart/radar-chart.ts
import { customElement, property } from "lit/decorators.js";
var WaRadarChart = class extends WaChart {
  constructor() {
    super(...arguments);
    this.type = "radar";
  }
};
__decorateClass([
  property()
], WaRadarChart.prototype, "type", 2);
WaRadarChart = __decorateClass([
  customElement("wa-radar-chart")
], WaRadarChart);

export {
  WaRadarChart
};
