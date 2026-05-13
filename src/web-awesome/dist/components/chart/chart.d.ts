import WebAwesomeElement from '$webawesome/internal/webawesome-element.js';
import { type PropertyValues } from 'lit';
import { Chart as ChartJS } from 'chart.js';
import type { ChartType, LayoutPosition } from 'chart.js';
/**
 * @summary Charts provide a flexible wrapper around Chart.js for building themed data visualizations. Use this component
 * for advanced configuration such as mixed chart types, custom plugins, and direct Chart.js instance access.
 * @documentation https://webawesome.com/docs/components/chart
 * @status experimental
 * @since 3.3
 *
 * @slot - An optional `<script type="application/json">` element containing the Chart.js configuration object.
 *
 * @cssproperty [--fill-color-1=color-mix(in srgb, var(--wa-color-blue-60) 40%, transparent)] - Fill color for the first dataset.
 * @cssproperty [--fill-color-2=color-mix(in srgb, var(--wa-color-pink-60) 40%, transparent)] - Fill color for the second dataset.
 * @cssproperty [--fill-color-3=color-mix(in srgb, var(--wa-color-green-60) 40%, transparent)] - Fill color for the third dataset.
 * @cssproperty [--fill-color-4=color-mix(in srgb, var(--wa-color-yellow-60) 40%, transparent)] - Fill color for the fourth dataset.
 * @cssproperty [--fill-color-5=color-mix(in srgb, var(--wa-color-purple-60) 40%, transparent)] - Fill color for the fifth dataset.
 * @cssproperty [--fill-color-6=color-mix(in srgb, var(--wa-color-orange-60) 40%, transparent)] - Fill color for the sixth dataset.
 * @cssproperty [--border-color-1=var(--wa-color-blue-60)] - Border color for the first dataset.
 * @cssproperty [--border-color-2=var(--wa-color-pink-60)] - Border color for the second dataset.
 * @cssproperty [--border-color-3=var(--wa-color-green-60)] - Border color for the third dataset.
 * @cssproperty [--border-color-4=var(--wa-color-yellow-60)] - Border color for the fourth dataset.
 * @cssproperty [--border-color-5=var(--wa-color-purple-60)] - Border color for the fifth dataset.
 * @cssproperty [--border-color-6=var(--wa-color-orange-60)] - Border color for the sixth dataset.
 * @cssproperty [--grid-color=var(--wa-color-neutral-border-quiet)] - Color of the chart grid lines and axis borders.
 * @cssproperty [--border-width=var(--wa-border-width-s)] - Border width for bars and arcs.
 * @cssproperty [--border-radius=var(--wa-border-radius-s)] - Border radius for bar charts.
 * @cssproperty [--grid-border-width=var(--wa-border-width-s)] - Border width for chart grid lines and axis borders.
 * @cssproperty [--line-border-width=var(--wa-border-width-m)] - Border width for line and radar charts.
 * @cssproperty [--point-radius=var(--wa-border-width-m)] - Radius of data point dots.
 */
export default class WaChart extends WebAwesomeElement {
    static css: import("lit").CSSResult[];
    static chartJS: typeof ChartJS;
    private watchedProperties;
    private hasRenderedInitialChart;
    /** A label for the chart, used for accessibility. */
    label: string | null;
    /** A description of the chart, used for accessibility. */
    description: string | null;
    /**
     * The type of chart to render. Valid types include `bar`, `line`, `pie`, `doughnut`, `polarArea`, `radar`, `scatter`,
     * and `bubble`.
     */
    type: ChartType;
    /** A label for the x-axis. */
    xLabel: string | null;
    /** A label for the y-axis. */
    yLabel: string | null;
    /** The position of the legend relative to the chart. */
    legendPosition: LayoutPosition | 'start' | 'end';
    /** Stacks datasets on top of each other along the value axis. */
    stacked: boolean;
    /** The base axis of the dataset. 'x' for vertical bars and 'y' for horizontal bars. */
    indexAxis: 'x' | 'y';
    /** Which axes to show grid lines on. */
    grid: 'x' | 'y' | 'both' | 'none';
    /** The minimum value for the value axis. */
    min: number | null;
    /** The maximum value for the value axis. */
    max: number | null;
    /** Disables chart animations */
    withoutAnimation: boolean;
    /** Hides the legend */
    withoutLegend: boolean;
    /** Hides tooltips over data points */
    withoutTooltip: boolean;
    /** The Chart.js configuration object. Setting this property will automatically re-render the chart. */
    config: ChartJS['config'];
    /** Additional Chart.js plugins to register for this chart instance. */
    plugins: never[];
    private localize;
    private computedStyle;
    chart: null | ChartJS;
    private defaultFonts;
    private defaultColors;
    /**
     * Properties which can be "expanded" to check CSS equivalents, useful for things like CSS vars.
     * The "value" for a key should be equivalent to a style property when using getComputedStyle on an element.
     */
    private transformableProperties;
    private fontBrand;
    private getDefaultConfig;
    /**
     * Takes an obj, and transforms its values based on keys provided by a schema. If a key is not found, it gets ignored.
     */
    private transformProperties;
    private expandProperty;
    private radialScale;
    private cartesianScale;
    private styleObserver;
    private renderScheduled;
    scheduleRenderChart(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    renderChart(): void;
    protected applyDefaultConfig(json: this['config']): Partial<import("chart.js").ChartConfiguration<keyof import("chart.js").ChartTypeRegistry, (number | import("chart.js").Point | [number, number] | import("chart.js").BubbleDataPoint | null)[], unknown> | import("chart.js").ChartConfigurationCustomTypesPerDataset<keyof import("chart.js").ChartTypeRegistry, (number | import("chart.js").Point | [number, number] | import("chart.js").BubbleDataPoint | null)[], unknown>> & Record<string, unknown>;
    private resolveCSSWidth;
    private computePropertyValue;
    updated(changedProperties: PropertyValues<this>): void;
    render(): import("lit-html").TemplateResult<1>;
    private extractCSSProperties;
    private brand;
    private isLeaf;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-chart': WaChart;
    }
}
