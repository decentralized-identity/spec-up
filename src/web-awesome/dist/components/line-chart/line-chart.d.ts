import type { ChartType } from 'chart.js';
import WaChart from '../chart/chart.js';
/**
 * @summary Line charts show trends over time by connecting data points with line segments. Use them when the x-axis
 * represents a sequential dimension and you want to emphasize the shape and direction of the data.
 * @documentation https://webawesome.com/docs/components/line-chart
 * @status experimental
 * @since 3.3
 */
export default class WaLineChart extends WaChart {
    type: ChartType;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-line-chart': WaLineChart;
    }
}
