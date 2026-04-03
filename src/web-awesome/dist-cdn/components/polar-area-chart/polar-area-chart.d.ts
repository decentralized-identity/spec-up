import type { ChartType } from 'chart.js';
import WaChart from '../chart/chart.js';
/**
 * @summary Polar area charts compare values using segments that radiate from a center point with varying radius. Unlike
 * pie charts, each segment has an equal angle while the radius varies, making them useful for comparing magnitudes
 * without visual bias.
 * @documentation https://webawesome.com/docs/components/polar-area-chart
 * @status experimental
 * @since 3.3
 */
export default class WaPolarAreaChart extends WaChart {
    type: ChartType;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-polar-area-chart': WaPolarAreaChart;
    }
}
