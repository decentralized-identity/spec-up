import type { ChartType } from 'chart.js';
import WaChart from '../chart/chart.js';
/**
 * @summary Bar charts compare quantities across categories using rectangular bars. They work well for showing rankings,
 * highlighting differences between groups, and tracking changes across time periods.
 * @documentation https://webawesome.com/docs/components/bar-chart
 * @status experimental
 * @since 3.3
 */
export default class WaBarChart extends WaChart {
    type: ChartType;
    orientation: 'vertical' | 'horizontal';
    applyDefaultConfig(json: this['config']): Partial<import("chart.js").ChartConfiguration<keyof import("chart.js").ChartTypeRegistry, (number | import("chart.js").Point | [number, number] | import("chart.js").BubbleDataPoint | null)[], unknown> | import("chart.js").ChartConfigurationCustomTypesPerDataset<keyof import("chart.js").ChartTypeRegistry, (number | import("chart.js").Point | [number, number] | import("chart.js").BubbleDataPoint | null)[], unknown>> & Record<string, unknown>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-bar-chart': WaBarChart;
    }
}
