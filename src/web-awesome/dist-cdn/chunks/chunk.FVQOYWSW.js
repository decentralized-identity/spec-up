/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  sparkline_styles_default
} from "./chunk.D5YF2BAO.js";
import {
  WebAwesomeElement,
  n,
  t
} from "./chunk.JB4GDECI.js";
import {
  b,
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/sparkline/sparkline.ts
var WaSparkline = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.label = "";
    this.data = "";
    this.appearance = "solid";
    this.curve = "linear";
  }
  /** Parses the data string into an array of numbers. */
  get parsedData() {
    if (!this.data) return [];
    return this.data.trim().split(/\s+/).map((v) => parseFloat(v)).filter((v) => !Number.isNaN(v));
  }
  /** Transforms data points to normalized SVG coordinates with padding to prevent clipping. */
  get points() {
    const data = this.parsedData;
    if (data.length < 2) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 5;
    const usableHeight = 100 - padding * 2;
    return data.map((value, index) => ({
      x: index / (data.length - 1) * 100,
      y: padding + usableHeight - (value - min) / range * usableHeight
    }));
  }
  /** Generates the SVG path based on the selected curve type. */
  getPath() {
    switch (this.curve) {
      case "natural":
        return this.getNaturalPath();
      case "step":
        return this.getStepPath();
      default:
        return this.getLinearPath();
    }
  }
  /** Creates a linear point-to-point path. */
  getLinearPath() {
    const points = this.points;
    if (points.length < 2) return "";
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  }
  /** Creates a smooth curved path using Catmull-Rom to cubic Bezier conversion. */
  getNaturalPath() {
    const points = this.points;
    if (points.length < 2) return "";
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  }
  /** Creates a stepped staircase path. */
  getStepPath() {
    const points = this.points;
    if (points.length < 2) return "";
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` H ${points[i].x} V ${points[i].y}`;
    }
    return path;
  }
  /** Creates a closed path for the fill area. */
  getFillPath(linePath) {
    const points = this.points;
    if (points.length < 2 || !linePath) return "";
    return `${linePath} L ${points[points.length - 1].x} 95 L ${points[0].x} 95 Z`;
  }
  render() {
    const linePath = this.getPath();
    const fillPath = this.appearance !== "line" ? this.getFillPath(linePath) : "";
    const showFill = this.appearance !== "line" && fillPath;
    return x`
      <svg part="base" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label=${this.label || null}>
        ${this.appearance === "gradient" ? b`
              <defs>
                <linearGradient id="sparkline-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="var(--fill-color)" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="var(--fill-color)" stop-opacity="0" />
                </linearGradient>
              </defs>
            ` : ""}
        ${showFill ? b`<path part="fill" d=${fillPath}></path>` : ""}
        <path part="line" d=${linePath} vector-effect="non-scaling-stroke"></path>
      </svg>
    `;
  }
};
WaSparkline.css = [sparkline_styles_default];
__decorateClass([
  n()
], WaSparkline.prototype, "label", 2);
__decorateClass([
  n()
], WaSparkline.prototype, "data", 2);
__decorateClass([
  n({ reflect: true })
], WaSparkline.prototype, "appearance", 2);
__decorateClass([
  n({ reflect: true })
], WaSparkline.prototype, "trend", 2);
__decorateClass([
  n({ reflect: true })
], WaSparkline.prototype, "curve", 2);
WaSparkline = __decorateClass([
  t("wa-sparkline")
], WaSparkline);

export {
  WaSparkline
};
