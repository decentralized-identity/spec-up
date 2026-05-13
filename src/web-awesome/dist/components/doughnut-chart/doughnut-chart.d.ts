import type { ChartType } from 'chart.js';
import WaChart from '../chart/chart.js';
/**
 * @summary Doughnut charts show proportional data as slices of a ring with a hollow center. They offer a cleaner look than
 * pie charts and work well in dashboards where the center space can provide additional context.
 * @documentation https://webawesome.com/docs/components/doughnut-chart
 * @status experimental
 * @since 3.3
 */
export default class WaDoughnutChart extends WaChart {
    type: ChartType;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-doughnut-chart': WaDoughnutChart;
    }
}
