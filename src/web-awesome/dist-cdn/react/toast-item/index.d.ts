import Component from '../../components/toast-item/toast-item.js';
import { type EventName } from '@lit/react';
import type { WaAfterHideEvent, WaAfterShowEvent, WaHideEvent, WaShowEvent } from '../../events/events.js';
export type { WaAfterHideEvent, WaAfterShowEvent, WaHideEvent, WaShowEvent } from '../../events/events.js';
/**
 * @summary Toast items are individual notifications displayed within a toast container.
 * @documentation https://webawesome.com/docs/components/toast
 * @status experimental
 * @since 3.3
 *
 * @dependency wa-icon
 * @dependency wa-progress-ring
 *
 * @slot - The toast item's message content.
 * @slot icon - An optional icon to show at the start of the toast item.
 *
 * @event wa-show - Emitted when the toast item begins to show.
 * @event wa-after-show - Emitted after the toast item has finished showing.
 * @event wa-hide - Emitted when the toast item begins to hide.
 * @event wa-after-hide - Emitted after the toast item has finished hiding.
 *
 * @csspart toast-item - The toast item's main container.
 * @csspart accent - The colored accent line on the start side.
 * @csspart icon - The icon container.
 * @csspart content - The message content container.
 * @csspart close-button - The close button element.
 * @csspart progress-ring - The progress ring component.
 * @csspart progress-ring__base - The progress ring's exported base part.
 * @csspart progress-ring__label - The progress ring's exported label part.
 * @csspart progress-ring__track - The progress ring's exported track part.
 * @csspart progress-ring__indicator - The progress ring's exported indicator part.
 * @csspart close-icon - The close icon element.
 * @csspart close-icon__svg - The close icon's exported svg part.
 *
 * @cssproperty --accent-width - The width of the accent line. Defaults to 4px.
 * @cssproperty --show-duration - The animation duration when showing. Defaults to 200ms.
 * @cssproperty --hide-duration - The animation duration when hiding. Defaults to 200ms.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaShow: EventName<WaShowEvent>;
    onWaAfterShow: EventName<WaAfterShowEvent>;
    onWaHide: EventName<WaHideEvent>;
    onWaAfterHide: EventName<WaAfterHideEvent>;
}>;
export default reactWrapper;
