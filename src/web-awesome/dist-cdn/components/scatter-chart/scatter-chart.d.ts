import type { ChartType } from 'chart.js';
import WaChart from '../chart/chart.js';
/**
 * @summary Scatter charts reveal relationships between two variables by plotting data points on a grid. They are ideal
 * for identifying correlations, clusters, and outliers in datasets.
 * @documentation https://webawesome.com/docs/components/scatter-chart
 * @status experimental
 * @since 3.3
 */
export default class WaScatterChart extends WaChart {
    type: ChartType;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-scatter-chart': WaScatterChart;
    }
}
