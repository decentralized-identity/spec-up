import WebAwesomeElement from '../../internal/webawesome-element.js';
/**
 * @summary Cards can be used to group related subjects in a container.
 * @documentation https://webawesome.com/docs/components/card
 * @status stable
 * @since 2.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot media - An optional media section to render at the start of the card.
 * @slot actions - An optional actions section to render at the end for the horizontal card.
 * @slot header-actions - An optional actions section to render in the header of the vertical card.
 * @slot footer-actions - An optional actions section to render in the footer of the vertical card.
 *
 * @csspart media - The container that wraps the card's media.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty [--spacing=var(--wa-space-l)] - The amount of space around and between sections of the card. Expects a single value.
 */
export default class WaCard extends WebAwesomeElement {
    static css: import("lit").CSSResult[];
    private readonly hasSlotController;
    /** The card's visual appearance. */
    appearance: 'accent' | 'filled' | 'outlined' | 'filled-outlined' | 'plain';
    /** Renders the card with a header. Only needed for SSR, otherwise is automatically added. */
    withHeader: boolean;
    /** Renders the card with an image. Only needed for SSR, otherwise is automatically added. */
    withMedia: boolean;
    /** Renders the card with a footer. Only needed for SSR, otherwise is automatically added. */
    withFooter: boolean;
    /** Renders the card's orientation **/
    orientation: 'horizontal' | 'vertical';
    updated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-card': WaCard;
    }
}
