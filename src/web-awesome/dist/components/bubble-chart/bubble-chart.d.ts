import type { ChartType } from 'chart.js';
import WaChart from '../chart/chart.js';
/**
 * @summary Bubble charts add a third dimension to scatter plots by varying the size of each data point. They are useful
 * for visualizing relationships where a third variable adds meaning beyond a simple x/y correlation.
 * @documentation https://webawesome.com/docs/components/bubble-chart
 * @status experimental
 * @since 3.3
 */
export default class WaBubbleChart extends WaChart {
    type: ChartType;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-bubble-chart': WaBubbleChart;
    }
}
