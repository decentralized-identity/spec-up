import Component from '../../components/toast/toast.js';
/**
 * @summary Toasts display brief, non-blocking notifications that appear temporarily above the page content.
 * @documentation https://webawesome.com/docs/components/toast
 * @status experimental
 * @since 3.3
 *
 * @dependency wa-toast-item
 *
 * @slot - Place `<wa-toast-item>` elements here to show them as notifications.
 *
 * @csspart stack - The container that holds the toast items.
 *
 * @cssproperty [--gap=var(--wa-space-s)] - The gap between stacked toast items.
 * @cssproperty [--width=28rem] - The width of the toast stack.
 *
 * @cssstate visible - Applied when the toast stack has one or more visible toast items.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
