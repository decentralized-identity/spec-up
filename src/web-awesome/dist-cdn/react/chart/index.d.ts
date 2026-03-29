import Component from '../../components/chart/chart.js';
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
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
