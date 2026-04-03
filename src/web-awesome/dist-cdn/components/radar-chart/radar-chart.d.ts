import type { ChartType } from 'chart.js';
import WaChart from '../chart/chart.js';
/**
 * @summary Radar charts compare multiple variables at once by plotting data on a radial grid. They are well-suited for
 * comparing profiles across several dimensions, such as skill assessments, product attributes, or performance metrics.
 * @documentation https://webawesome.com/docs/components/radar-chart
 * @status experimental
 * @since 3.3
 */
export default class WaRadarChart extends WaChart {
    type: ChartType;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-radar-chart': WaRadarChart;
    }
}
