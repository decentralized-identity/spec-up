import Component from '../../components/sparkline/sparkline.js';
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
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
