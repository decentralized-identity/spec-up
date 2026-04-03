import type { PropertyValues } from 'lit';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-form-associated-element.js';
/**
 * @summary Textareas collect data from the user and allow multiple lines of text.
 * @documentation https://webawesome.com/docs/components/textarea
 * @status stable
 * @since 2.0
 *
 * @slot label - The textarea's label. Alternatively, you can use the `label` attribute.
 * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.
 *
 * @event blur - Emitted when the control loses focus.
 * @event change - Emitted when an alteration to the control's value is committed by the user.
 * @event focus - Emitted when the control gains focus.
 * @event input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart label - The label
 * @csspart form-control-input - The input's wrapper.
 * @csspart hint - The hint's wrapper.
 * @csspart textarea - The internal `<textarea>` control.
 * @csspart base - The wrapper around the `<textarea>` control.
 *
 * @cssstate blank - The textarea is empty.
 */
export default class WaTextarea extends WebAwesomeFormAssociatedElement {
    static css: import("lit").CSSResult[];
    static get validators(): import("../../internal/webawesome-form-associated-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    private resizeObserver;
    input: HTMLTextAreaElement;
    base: HTMLDivElement;
    sizeAdjuster: HTMLTextAreaElement;
    title: string;
    /** The name of the textarea, submitted as a name/value pair with form data. */
    name: string | null;
    private _value;
    /** The current value of the input, submitted as a name/value pair with form data. */
    get value(): string | null;
    set value(val: string | null);
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultValue: string;
    /** The textarea's size. */
    size: 'small' | 'medium' | 'large';
    /** The textarea's visual appearance. */
    appearance: 'filled' | 'outlined' | 'filled-outlined';
    /** The textarea's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /** The textarea's hint. If you need to display HTML, use the `hint` slot instead. */
    hint: string;
    /** Placeholder text to show as a hint when the input is empty. */
    placeholder: string;
    /** The number of rows to display by default. */
    rows: number;
    /** Controls how the textarea can be resized. */
    resize: 'none' | 'vertical' | 'horizontal' | 'both' | 'auto';
    /** Disables the textarea. */
    disabled: boolean;
    /** Makes the textarea readonly. */
    readonly: boolean;
    /** Makes the textarea a required field. */
    required: boolean;
    /** The minimum length of input that will be considered valid. */
    minlength: number;
    /** The maximum length of input that will be considered valid. */
    maxlength: number;
    /** Controls whether and how text input is automatically capitalized as it is entered by the user. */
    autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    /** Indicates whether the browser's autocorrect feature is on or off. */
    autocorrect: string;
    /**
     * Specifies what permission the browser has to provide assistance in filling out form field values. Refer to
     * [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.
     */
    autocomplete: string;
    /** Indicates that the input should receive focus on page load. */
    autofocus: boolean;
    /** Used to customize the label or icon of the Enter key on virtual keyboards. */
    enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    /** Enables spell checking on the textarea. */
    spellcheck: boolean;
    /**
     * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
     * keyboard on supportive devices.
     */
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /**
     * Used for SSR. If you're slotting in a `label` element, make sure to set this to `true`.
     */
    withLabel: boolean;
    /**
     * Used for SSR. If you're slotting in a `hint` element, make sure to set this to `true`.
     */
    withHint: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleBlur;
    private handleChange;
    private handleInput;
    private setTextareaDimensions;
    handleRowsChange(): void;
    handleValueChange(): Promise<void>;
    updated(changedProperties: PropertyValues<this>): void;
    /** Sets focus on the textarea. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the textarea. */
    blur(): void;
    /** Selects all the text in the textarea. */
    select(): void;
    /** Gets or sets the textarea's scroll position. */
    scrollPosition(position?: {
        top?: number;
        left?: number;
    }): {
        top: number;
        left: number;
    } | undefined;
    /** Sets the start and end positions of the text selection (0-based). */
    setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): void;
    /** Replaces a range of text with a new string. */
    setRangeText(replacement: string, start?: number, end?: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): void;
    formResetCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-textarea': WaTextarea;
    }
}
