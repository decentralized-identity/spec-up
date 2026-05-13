/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  chart_styles_default
} from "./chunk.DWQFIKUR.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/chart/chart.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import StyleObserver from "style-observer";
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  Title,
  Tooltip
} from "chart.js";
import { LocalizeController } from "@shoelace-style/localize";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  BarController,
  LineController,
  PointElement,
  LineElement,
  ScatterController,
  BubbleController,
  DoughnutController,
  ArcElement,
  PieController,
  RadialLinearScale,
  PolarAreaController,
  RadarController,
  Filler
);
ChartJS.defaults.backgroundColor = "transparent";
function isString(data) {
  return typeof data === "string" || data instanceof String;
}
var _brand = Symbol("leaf");
function isNumber(value) {
  return !isNaN(Number(value)) && isFinite(Number(value));
}
function deepMerge(src, target) {
  const result = structuredClone(src);
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const targetValue = target[key];
      const srcValue = result[key];
      if (isPlainObject(targetValue) && isPlainObject(srcValue)) {
        result[key] = deepMerge(srcValue, targetValue);
      } else {
        result[key] = targetValue;
      }
    }
  }
  return result;
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
}
var WaChart = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    // Pass these along to style observer to watch for changes and re-render the chart.
    this.watchedProperties = /* @__PURE__ */ new Set();
    this.hasRenderedInitialChart = false;
    this.label = null;
    this.description = null;
    this.type = "bar";
    this.xLabel = null;
    this.yLabel = null;
    this.legendPosition = "top";
    this.stacked = false;
    this.indexAxis = "x";
    this.grid = "both";
    this.min = null;
    this.max = null;
    this.withoutAnimation = false;
    this.withoutLegend = false;
    this.withoutTooltip = false;
    this.plugins = [];
    this.localize = new LocalizeController(this);
    this.computedStyle = null;
    this.chart = null;
    this.defaultFonts = {
      title: {
        size: "var(--wa-font-size-m)",
        family: "var(--wa-font-family-body)",
        lineHeight: "var(--wa-line-height-condensed)",
        weight: "var(--wa-font-weight-bold)"
      },
      body: {
        size: "var(--wa-font-size-xs)",
        family: "var(--wa-font-family-body)",
        lineHeight: "var(--wa-line-height-normal)",
        weight: "var(--wa-font-weight-body)"
      },
      tooltip: {
        size: "var(--wa-tooltip-font-size)",
        family: "var(--wa-font-family-body)",
        lineHeight: "var(--wa-tooltip-line-height)",
        weight: "var(--wa-font-weight-body)"
      },
      tooltipTitle: {
        size: "var(--wa-tooltip-font-size)",
        family: "var(--wa-font-family-body)",
        lineHeight: "var(--wa-tooltip-line-height)",
        weight: "var(--wa-font-weight-bold)"
      }
    };
    this.defaultColors = {
      datasets: {
        backgroundColor: [
          "var(--fill-color-1)",
          "var(--fill-color-2)",
          "var(--fill-color-3)",
          "var(--fill-color-4)",
          "var(--fill-color-5)",
          "var(--fill-color-6)"
        ],
        borderColor: [
          "var(--border-color-1)",
          "var(--border-color-2)",
          "var(--border-color-3)",
          "var(--border-color-4)",
          "var(--border-color-5)",
          "var(--border-color-6)"
        ]
      },
      textColor: "var(--wa-color-text-quiet)",
      tooltipTextColor: "var(--wa-tooltip-content-color)",
      tooltipBackgroundColor: "var(--wa-tooltip-background-color)",
      tooltipBorderColor: "var(--wa-tooltip-border-color)",
      gridLineColor: "var(--grid-color)",
      borderColor: "var(--grid-color)"
    };
    /**
     * Properties which can be "expanded" to check CSS equivalents, useful for things like CSS vars.
     * The "value" for a key should be equivalent to a style property when using getComputedStyle on an element.
     */
    this.transformableProperties = {
      data: {
        // datasets will be an array, transform the keys of "properties" like we transform this.
        datasets: this.brand({
          transform: (dataset) => {
            const schema = {
              borderColor: this.brand({ property: "color" }),
              backgroundColor: this.brand({ property: "backgroundColor" }),
              pointBackgroundColor: this.brand({ property: "color" }),
              borderWidth: this.brand({ property: "width", transform: Number }),
              pointRadius: this.brand({ property: "width", transform: Number })
            };
            const transformedData = this.transformProperties(dataset, schema);
            return transformedData;
          }
        })
      },
      options: {
        elements: {
          line: {
            borderWidth: this.brand({ property: "width", transform: Number })
          },
          point: {
            radius: this.brand({ property: "width", transform: Number })
          }
        },
        plugins: {
          title: {
            color: this.brand({ property: "color" }),
            font: this.fontBrand(),
            padding: this.brand({
              transform: (obj) => {
                if (isString(obj)) {
                  return this.expandProperty(obj, this.brand({ property: "width", transform: Number }));
                }
                if (isPlainObject(obj)) {
                  const schema = {
                    top: this.brand({ property: "width", transform: Number }),
                    bottom: this.brand({ property: "width", transform: Number })
                  };
                  return this.transformProperties(obj, schema);
                }
                return obj;
              }
            })
          },
          legend: {
            color: this.brand({ property: "color" }),
            labels: {
              color: this.brand({ property: "color" }),
              font: this.fontBrand(),
              padding: this.brand({ property: "width", transform: Number })
            }
          },
          tooltip: {
            backgroundColor: this.brand({ property: "backgroundColor" }),
            titleColor: this.brand({ property: "color" }),
            bodyColor: this.brand({ property: "color" }),
            footerColor: this.brand({ property: "color" }),
            borderColor: this.brand({ property: "color" }),
            borderWidth: this.brand({ property: "width", transform: Number }),
            cornerRadius: this.brand({ property: "width", transform: Number }),
            caretSize: this.brand({ property: "width", transform: Number }),
            boxBorderColor: this.brand({ property: "color" }),
            titleFont: this.fontBrand(),
            bodyFont: this.fontBrand(),
            footerFont: this.fontBrand(),
            padding: this.brand({
              transform: (obj) => {
                if (isString(obj)) {
                  return this.expandProperty(obj, this.brand({ property: "width", transform: Number }));
                }
                if (isPlainObject(obj)) {
                  const schema = {
                    top: this.brand({ property: "width", transform: Number }),
                    bottom: this.brand({ property: "width", transform: Number }),
                    right: this.brand({ property: "width", transform: Number }),
                    left: this.brand({ property: "width", transform: Number })
                  };
                  return this.transformProperties(obj, schema);
                }
                return obj;
              }
            }),
            boxPadding: this.brand({ property: "width", transform: Number }),
            titleMarginBottom: this.brand({ property: "width", transform: Number })
          }
        },
        scales: {
          x: {
            ticks: {
              color: this.brand({ property: "color" }),
              font: this.fontBrand()
            },
            grid: {
              color: this.brand({ property: "color" })
            },
            title: {
              color: this.brand({ property: "color" }),
              font: this.fontBrand()
            },
            border: {
              color: this.brand({ property: "color" })
            }
          },
          y: {
            ticks: {
              color: this.brand({ property: "color" }),
              font: this.fontBrand()
            },
            grid: {
              color: this.brand({ property: "color" })
            },
            title: {
              color: this.brand({ property: "color" }),
              font: this.fontBrand()
            },
            border: {
              color: this.brand({ property: "color" })
            }
          },
          r: {
            angleLines: {
              color: this.brand({ property: "color" }),
              font: this.fontBrand()
            },
            grid: {
              color: this.brand({ property: "color" })
            },
            pointLabels: {
              color: this.brand({ property: "color" }),
              font: this.fontBrand()
            },
            ticks: {
              color: this.brand({ property: "color" }),
              backdropColor: this.brand({ property: "backgroundColor" }),
              font: this.fontBrand()
            },
            border: {
              color: this.brand({ property: "color" })
            }
          }
        }
      }
    };
    this.styleObserver = new StyleObserver(() => this.scheduleRenderChart());
    this.renderScheduled = false;
  }
  fontBrand() {
    return this.brand({
      transform: (data) => {
        if (!data) {
          return data;
        }
        const schema = {
          size: this.brand({ property: "fontSize", transform: Number }),
          weight: this.brand({ property: "fontWeight", transform: Number }),
          family: this.brand({ property: "fontFamily" }),
          lineHeight: this.brand({ property: "lineHeight", transform: Number })
        };
        const obj = this.transformProperties(data, schema);
        return obj;
      }
    });
  }
  getDefaultConfig(type) {
    const isCartesian = !["pie", "doughnut", "polarArea", "radar"].includes(type);
    const isRadial = ["polarArea", "radar"].includes(type);
    const isRtl = this.localize.dir() === "rtl";
    let legendPosition = this.legendPosition;
    if (legendPosition === "start") {
      if (isRtl) {
        legendPosition = "right";
      } else {
        legendPosition = "left";
      }
    }
    if (legendPosition === "end") {
      if (isRtl) {
        legendPosition = "left";
      } else {
        legendPosition = "right";
      }
    }
    const defaultColors = this.defaultColors;
    const config = {
      type,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: this.indexAxis,
        animation: this.withoutAnimation ? false : { duration: 500, easing: "easeOutQuart" },
        elements: {
          point: {
            borderWidth: 0,
            radius: Number(this.resolveCSSWidth("--point-radius", 3))
          },
          line: {
            borderWidth: Number(this.resolveCSSWidth("--line-border-width", 2))
          },
          bar: {
            borderWidth: Number(this.resolveCSSWidth("--border-width", 1)),
            borderRadius: Number(this.resolveCSSWidth("--border-radius", 0))
          },
          arc: {
            borderWidth: Number(this.resolveCSSWidth("--border-width", 1))
          }
        },
        // TODO: need to eval these.
        plugins: {
          title: {
            display: Boolean(this.label),
            text: this.label || "",
            // position: labelPosition,
            color: defaultColors.textColor,
            rtl: isRtl,
            font: this.defaultFonts.title,
            padding: "var(--wa-space-xs)"
          },
          legend: {
            display: !this.withoutLegend,
            position: legendPosition,
            rtl: isRtl,
            color: defaultColors.textColor,
            labels: {
              color: defaultColors.textColor,
              font: this.defaultFonts.body,
              padding: "var(--wa-space-s)",
              usePointStyle: true,
              pointStyle: "rectRounded"
            }
          },
          tooltip: {
            enabled: !this.withoutTooltip,
            rtl: isRtl,
            // TODO: grab what wa-tooltip does.
            backgroundColor: defaultColors.tooltipBackgroundColor,
            titleColor: defaultColors.tooltipTextColor,
            bodyColor: defaultColors.tooltipTextColor,
            footerColor: defaultColors.tooltipTextColor,
            borderColor: defaultColors.tooltipBorderColor,
            borderWidth: "var(--wa-tooltip-border-width)",
            borderStyle: "var(--wa-tooltip-border-style)",
            cornerRadius: "var(--wa-tooltip-border-radius)",
            caretSize: "var(--wa-tooltip-arrow-size)",
            titleFont: this.defaultFonts.tooltipTitle,
            footerFont: this.defaultFonts.tooltip,
            bodyFont: this.defaultFonts.tooltip,
            padding: {
              // tooltips don't expose padding, they're technically padding: 0.25em 0.5em, so we just copy it here.
              top: "0.25em",
              right: "0.5em",
              bottom: "0.25em",
              left: "0.5em"
            },
            boxPadding: "var(--wa-space-2xs)",
            titleMarginBottom: "0"
          }
        }
      }
    };
    if (isCartesian) {
      config.options.scales = this.cartesianScale(isRtl);
    }
    if (isRadial) {
      config.options.scales = this.radialScale();
    }
    return config;
  }
  /**
   * Takes an obj, and transforms its values based on keys provided by a schema. If a key is not found, it gets ignored.
   */
  transformProperties(obj, schema) {
    if (Array.isArray(obj)) {
      return obj.map((data) => this.transformProperties(data, schema));
    }
    const result = structuredClone(obj);
    for (const key of Object.keys(schema)) {
      const schemaVal = schema[key];
      const inputVal = obj?.[key];
      const isLeaf = this.isLeaf(schemaVal);
      if (isLeaf) {
        if (inputVal !== void 0) {
          if (Array.isArray(inputVal)) {
            result[key] = inputVal.map((val) => this.expandProperty(val, schemaVal));
          } else {
            result[key] = this.expandProperty(inputVal, schemaVal);
          }
        }
      } else if (typeof schemaVal === "object" && typeof inputVal === "object" && inputVal !== null) {
        result[key] = this.transformProperties(inputVal, schemaVal);
      }
    }
    return result;
  }
  expandProperty(value, leaf) {
    if (this.computedStyle && isString(value) && "property" in leaf && leaf.property) {
      this.extractCSSProperties(value).forEach((str) => {
        this.watchedProperties.add(str);
      });
      value = this.computePropertyValue(value, leaf.property);
    }
    return leaf.transform ? leaf.transform(value) : value;
  }
  radialScale() {
    return {
      r: {
        grace: "5%",
        angleLines: {
          color: this.defaultColors.gridLineColor,
          lineWidth: Number(this.resolveCSSWidth("--grid-border-width", 1))
        },
        grid: {
          color: this.defaultColors.gridLineColor,
          lineWidth: Number(this.resolveCSSWidth("--grid-border-width", 1))
        },
        pointLabels: {
          color: this.defaultColors.textColor,
          font: this.defaultFonts.body
        },
        ticks: {
          color: this.defaultColors.textColor,
          backdropColor: "transparent",
          font: this.defaultFonts.body
        },
        border: {
          color: this.defaultColors.borderColor,
          width: Number(this.resolveCSSWidth("--grid-border-width", 1))
        }
      }
    };
  }
  cartesianScale(isRtl) {
    const valueAxis = this.indexAxis === "y" ? "x" : "y";
    return {
      x: {
        stacked: this.stacked,
        reverse: isRtl,
        ticks: {
          color: this.defaultColors.textColor,
          font: this.defaultFonts.body
        },
        grid: {
          display: this.grid === "x" || this.grid === "both",
          color: this.defaultColors.gridLineColor,
          lineWidth: Number(this.resolveCSSWidth("--grid-border-width", 1))
        },
        ...valueAxis === "x" && {
          grace: "5%",
          min: this.min != null ? Number(this.min) : null,
          max: this.max != null ? Number(this.max) : null
        },
        title: {
          display: !!this.xLabel,
          text: this.xLabel,
          color: this.defaultColors.textColor,
          font: this.defaultFonts.title
        },
        border: {
          color: this.defaultColors.borderColor,
          width: Number(this.resolveCSSWidth("--grid-border-width", 1))
        }
      },
      y: {
        position: isRtl ? "right" : "left",
        stacked: this.stacked,
        beginAtZero: this.type === "bar",
        ticks: {
          color: this.defaultColors.textColor,
          font: this.defaultFonts.body
        },
        grid: {
          display: this.grid === "y" || this.grid === "both",
          color: this.defaultColors.gridLineColor,
          lineWidth: Number(this.resolveCSSWidth("--grid-border-width", 1))
        },
        ...valueAxis === "y" && {
          grace: "5%",
          min: this.min != null ? Number(this.min) : null,
          max: this.max != null ? Number(this.max) : null
        },
        title: {
          display: !!this.yLabel,
          text: this.yLabel,
          color: this.defaultColors.textColor,
          font: this.defaultFonts.title
        },
        border: {
          color: this.defaultColors.borderColor,
          width: Number(this.resolveCSSWidth("--grid-border-width", 1))
        }
      }
    };
  }
  scheduleRenderChart() {
    if (this.renderScheduled) return;
    this.renderScheduled = true;
    requestAnimationFrame(() => {
      this.renderScheduled = false;
      this.renderChart();
    });
  }
  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this.scheduleRenderChart();
    });
  }
  disconnectedCallback() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.styleObserver.unobserve(this);
    super.disconnectedCallback();
  }
  renderChart() {
    const canvas = this.shadowRoot?.querySelector("canvas");
    if (!canvas) {
      return;
    }
    const scripts = this.shadowRoot?.querySelector("slot:not([name])")?.assignedElements({ flatten: true }).filter((el) => {
      return el.localName === "script";
    });
    let json = this.config;
    if (scripts && scripts.length > 0) {
      const script = scripts[0];
      json = JSON.parse(script.textContent || "{}");
    }
    if (!json) {
      return;
    }
    json = this.applyDefaultConfig(json);
    if (this.chart) {
      this.chart.data = json.data;
      this.chart.options = json.options;
      if (this.hasRenderedInitialChart) {
        this.chart.update("none");
      } else {
        this.hasRenderedInitialChart = true;
        this.chart.update();
      }
    } else {
      this.chart = new ChartJS(canvas, json);
    }
    if (this.watchedProperties.size > 0) {
      this.styleObserver.observe(this, Array.from(this.watchedProperties));
    }
  }
  applyDefaultConfig(json) {
    const effectiveType = json?.type || this.type;
    let mergedConfig = deepMerge(this.getDefaultConfig(effectiveType), json);
    if (Array.isArray(mergedConfig.data?.datasets)) {
      const datasets = mergedConfig.data.datasets;
      const fillColors = this.defaultColors.datasets.backgroundColor;
      const borderColors = this.defaultColors.datasets.borderColor;
      const segmentedTypes = /* @__PURE__ */ new Set(["pie", "doughnut", "polarArea"]);
      const pointTypes = /* @__PURE__ */ new Set(["line", "scatter", "radar", "bubble"]);
      const chartType = mergedConfig.type || this.type;
      datasets.forEach((data, index) => {
        if (!data.type) {
          data.type = chartType;
        }
        const isSegmented = segmentedTypes.has(data.type);
        const hasPoints = pointTypes.has(data.type);
        if (data.backgroundColor === void 0) {
          data.backgroundColor = isSegmented ? fillColors : fillColors[index % fillColors.length];
        }
        if (data.borderColor === void 0) {
          data.borderColor = isSegmented ? borderColors : borderColors[index % borderColors.length];
        }
        if (hasPoints && data.pointBackgroundColor === void 0) {
          data.pointBackgroundColor = data.borderColor;
        }
        if (hasPoints && data.pointRadius === void 0) {
          data.pointRadius = `var(--point-radius, 3px)`;
        }
      });
    }
    mergedConfig = this.transformProperties(mergedConfig, this.transformableProperties);
    mergedConfig.plugins || (mergedConfig.plugins = []);
    mergedConfig.plugins.unshift(...this.plugins);
    return mergedConfig;
  }
  resolveCSSWidth(customProperty, fallback) {
    const varExpression = `var(${customProperty}, ${fallback}px)`;
    this.watchedProperties.add(customProperty);
    return this.computePropertyValue(varExpression, "width");
  }
  computePropertyValue(str, type) {
    const computedStyle = this.computedStyle;
    let value = str;
    if (!computedStyle) {
      return value;
    }
    const propertyCalculator = this.shadowRoot?.querySelector("#property-calculator");
    if (!propertyCalculator) {
      return str;
    }
    const pixelTypes = ["width", "height", "fontSize", "lineHeight"];
    if (pixelTypes.includes(type) && isNumber(str)) {
      str = str.toString() + "px";
    }
    propertyCalculator.style[type] = str;
    let val = computedStyle[type];
    if (pixelTypes.includes(type) && isString(val)) {
      val = val.split(/px/)[0];
    }
    if (type === "lineHeight") {
      const fontSize = Number(computedStyle.fontSize.split(/px/)[0]);
      val = Number(val);
      if (fontSize && val) {
        return val / fontSize;
      } else {
        return 1.5;
      }
    }
    if (isString(val) && val.startsWith("color(srgb ")) {
      const matchArray = val.match(/[\d.]+/g);
      if (matchArray) {
        const [r, g, b, a] = matchArray;
        val = `rgba(${Math.round(Number(r) * 255)}, ${Math.round(Number(g) * 255)}, ${Math.round(Number(b) * 255)}, ${a ?? 1})`;
      }
    }
    return val;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (!this.computedStyle) {
      const span = this.shadowRoot?.querySelector("#property-calculator");
      if (!span) {
        return;
      }
      this.computedStyle = getComputedStyle(span);
    }
    this.scheduleRenderChart();
  }
  render() {
    return html`
      <!-- data -->
      <slot style="display: none;"></slot>

      <!-- Hidden span for doing things like color / css variable calculations. -->
      <div id="property-calculator" class="wa-visually-hidden" aria-hidden="true"></div>

      <canvas role="img" aria-label="${this.label}" aria-description="${this.description}"></canvas>
    `;
  }
  // Helper to add transparency to a color
  // applyTransparency (color: string, opacity: number) {
  // }
  extractCSSProperties(text) {
    const regex = /--(\S+?)(?=\s|[), ]|$)/g;
    return text.match(regex) || [];
  }
  brand(obj) {
    obj[_brand] = _brand;
    return obj;
  }
  isLeaf(val) {
    return typeof val === "object" && val !== null && val[_brand] === _brand;
  }
};
WaChart.css = [chart_styles_default];
WaChart.chartJS = ChartJS;
__decorateClass([
  property()
], WaChart.prototype, "label", 2);
__decorateClass([
  property()
], WaChart.prototype, "description", 2);
__decorateClass([
  property()
], WaChart.prototype, "type", 2);
__decorateClass([
  property()
], WaChart.prototype, "xLabel", 2);
__decorateClass([
  property()
], WaChart.prototype, "yLabel", 2);
__decorateClass([
  property({ attribute: "legend-position" })
], WaChart.prototype, "legendPosition", 2);
__decorateClass([
  property({ type: Boolean })
], WaChart.prototype, "stacked", 2);
__decorateClass([
  property({ attribute: "index-axis" })
], WaChart.prototype, "indexAxis", 2);
__decorateClass([
  property()
], WaChart.prototype, "grid", 2);
__decorateClass([
  property()
], WaChart.prototype, "min", 2);
__decorateClass([
  property()
], WaChart.prototype, "max", 2);
__decorateClass([
  property({ attribute: "without-animation", type: Boolean, reflect: true })
], WaChart.prototype, "withoutAnimation", 2);
__decorateClass([
  property({ attribute: "without-legend", type: Boolean, reflect: true })
], WaChart.prototype, "withoutLegend", 2);
__decorateClass([
  property({ attribute: "without-tooltip", type: Boolean, reflect: true })
], WaChart.prototype, "withoutTooltip", 2);
__decorateClass([
  property({ attribute: false, hasChanged: () => true })
], WaChart.prototype, "config", 2);
__decorateClass([
  property({ type: Array })
], WaChart.prototype, "plugins", 2);
WaChart = __decorateClass([
  customElement("wa-chart")
], WaChart);

export {
  WaChart
};
