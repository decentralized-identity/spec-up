import type { ChartType } from 'chart.js';
import WaChart from '../chart/chart.js';
/**
 * @summary Pie charts show the proportional composition of a whole as slices of a circle. They work best with a small
 * number of categories where the relative proportions matter more than exact values.
 * @documentation https://webawesome.com/docs/components/pie-chart
 * @status experimental
 * @since 3.3
 */
export default class WaPieChart extends WaChart {
    type: ChartType;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-pie-chart': WaPieChart;
    }
}
