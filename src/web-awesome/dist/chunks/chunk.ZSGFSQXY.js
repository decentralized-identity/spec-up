/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaChart
} from "./chunk.NJHAURDV.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/bar-chart/bar-chart.ts
import { customElement, property } from "lit/decorators.js";
var WaBarChart = class extends WaChart {
  constructor() {
    super(...arguments);
    this.type = "bar";
    this.orientation = "vertical";
  }
  applyDefaultConfig(json) {
    const config = super.applyDefaultConfig(json);
    if (this.orientation === "horizontal") {
      if (config.options) {
        config.options.indexAxis = "y";
      }
    }
    return config;
  }
};
__decorateClass([
  property()
], WaBarChart.prototype, "type", 2);
__decorateClass([
  property()
], WaBarChart.prototype, "orientation", 2);
WaBarChart = __decorateClass([
  customElement("wa-bar-chart")
], WaBarChart);

export {
  WaBarChart
};
