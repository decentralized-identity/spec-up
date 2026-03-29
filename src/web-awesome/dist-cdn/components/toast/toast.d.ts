import WebAwesomeElement from '$webawesome/internal/webawesome-element.js';
import '../toast-item/toast-item.js';
import type WaToastItem from '../toast-item/toast-item.js';
export interface ToastIconOptions {
    /** The name of the icon to draw. */
    name: string;
    /** The name of a registered custom icon library. */
    library?: string;
    /** The family of icons to choose from (e.g., 'classic', 'brands', 'duotone', 'sharp', 'sharp-duotone'). */
    family?: string;
    /** The icon variant (e.g., 'thin', 'light', 'regular', 'solid'). */
    variant?: string;
}
export interface ToastCreateOptions {
    /**
     * Set to true to process the message as HTML instead of plain text. Make sure you trust the content, otherwise your
     * app may become vulnerable to XSS exploits!
     */
    allowHtml?: boolean;
    /**
     * The length of time in milliseconds to show the notification before removing it. Set to 0 to keep the notification
     * open until the user dismisses it.
     */
    duration?: number;
    /**
     * An optional icon to display at the start of the toast item. Can be a string (icon name) or an object with
     * additional icon options like library, family, and variant.
     */
    icon?: string | ToastIconOptions;
    /** The toast item's variant. */
    variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
    /** The toast item's size. */
    size?: 'small' | 'medium' | 'large';
}
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
export default class WaToast extends WebAwesomeElement {
    static css: import("lit").CSSResult;
    private activatedToastItems;
    private positionCache;
    stack: HTMLElement;
    /** The placement of the toast stack on the screen. */
    placement: 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleDocumentKeyDown;
    private handleSlotChange;
    private handleAfterHide;
    private getToastItems;
    /** Captures the current position of all toast items for FLIP animation. */
    private capturePositions;
    /** Animates toast items from their cached positions to their new positions using FLIP. */
    private animatePositions;
    private showStack;
    private hideStack;
    /**
     * Creates a toast notification programmatically and adds it to the stack. Returns a reference to the created toast
     * item element.
     */
    create(message: string, options?: ToastCreateOptions): Promise<WaToastItem>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-toast': WaToast;
    }
}
