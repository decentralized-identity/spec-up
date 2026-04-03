import WebAwesomeElement from '$webawesome/internal/webawesome-element.js';
/**
 * @summary Sparklines display inline data trends as compact, visual charts.
 * @documentation https://webawesome.com/docs/components/sparkline
 * @status experimental
 * @since 3.2
 *
 * @csspart base - The SVG container element.
 * @csspart line - The sparkline stroke path.
 * @csspart fill - The filled area under the line (visible with gradient or solid appearance).
 *
 * @cssproperty --fill-color - The fill color for the area under the line.
 * @cssproperty --line-color - The color of the sparkline stroke.
 * @cssproperty --line-width - The width of the sparkline stroke.
 */
export default class WaSparkline extends WebAwesomeElement {
    static css: import("lit").CSSResult[];
    /** An accessible label describing the sparkline for screen readers. */
    label: string;
    /** Space-separated numeric values to visualize (e.g., "10 20 40 25 35"). */
    data: string;
    /** The visual fill style of the sparkline. */
    appearance: 'gradient' | 'line' | 'solid';
    /** A trend to indicate, which will affect the sparkline's default color. */
    trend: 'positive' | 'negative' | 'neutral';
    /** The type of curve used to connect data points. */
    curve: 'linear' | 'natural' | 'step';
    /** Parses the data string into an array of numbers. */
    private get parsedData();
    /** Transforms data points to normalized SVG coordinates with padding to prevent clipping. */
    private get points();
    /** Generates the SVG path based on the selected curve type. */
    private getPath;
    /** Creates a linear point-to-point path. */
    private getLinearPath;
    /** Creates a smooth curved path using Catmull-Rom to cubic Bezier conversion. */
    private getNaturalPath;
    /** Creates a stepped staircase path. */
    private getStepPath;
    /** Creates a closed path for the fill area. */
    private getFillPath;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-sparkline': WaSparkline;
    }
}
