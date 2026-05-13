import type WaOption from '$webawesome/components/option/option.js';
import type WaPopup from '$webawesome/components/popup/popup.js';
import { WebAwesomeFormAssociatedElement } from '$webawesome/internal/webawesome-form-associated-element.js';
import type { PropertyValues, TemplateResult } from 'lit';
import '../icon/icon.js';
import '../option/option.js';
import '../popup/popup.js';
import '../tag/tag.js';
/**
 * @summary Comboboxes combine a text input with a listbox, allowing users to filter and select from predefined options or enter custom values.
 * @documentation https://webawesome.com/docs/components/combobox
 * @status experimental
 * @since 3.1
 *
 * @dependency wa-icon
 * @dependency wa-option
 * @dependency wa-popup
 * @dependency wa-tag
 *
 * @slot - The listbox options. Must be `<wa-option>` elements. You can use `<wa-divider>` to group items visually.
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot start - An element, such as `<wa-icon>`, placed at the start of the combobox.
 * @slot end - An element, such as `<wa-icon>`, placed at the end of the combobox.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot expand-icon - The icon to show when the control is expanded and collapsed. Rotates on open and close.
 * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.
 *
 * @event change - Emitted when the control's value changes.
 * @event input - Emitted when the control receives input.
 * @event focus - Emitted when the control gains focus.
 * @event blur - Emitted when the control loses focus.
 * @event wa-clear - Emitted when the control's value is cleared.
 * @event wa-show - Emitted when the combobox's menu opens.
 * @event wa-after-show - Emitted after the combobox's menu opens and all animations are complete.
 * @event wa-hide - Emitted when the combobox's menu closes.
 * @event wa-after-hide - Emitted after the combobox's menu closes and all animations are complete.
 * @event wa-create - Emitted when the user selects the "create" option. Call `event.preventDefault()` to handle creation yourself. The event `detail` contains `{ inputValue: string }`.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The combobox's wrapper.
 * @csspart hint - The hint's wrapper.
 * @csspart combobox - The container the wraps the start, end, value, clear icon, and expand button.
 * @csspart start - The container that wraps the `start` slot.
 * @csspart end - The container that wraps the `end` slot.
 * @csspart combobox-input - The text input element.
 * @csspart listbox - The listbox container where options are slotted.
 * @csspart tags - The container that houses option tags when `multiselect` is used.
 * @csspart tag - The individual tags that represent each multiselect option.
 * @csspart tag__content - The tag's content part.
 * @csspart tag__remove-button - The tag's remove button.
 * @csspart tag__remove-button__base - The tag's remove button base part.
 * @csspart clear-button - The clear button.
 * @csspart expand-icon - The container that wraps the expand icon.
 *
 * @cssproperty [--show-duration=100ms] - The duration of the show animation.
 * @cssproperty [--hide-duration=100ms] - The duration of the hide animation.
 * @cssproperty [--tag-max-size=10ch] - When using `multiple`, the max size of tags before their content is truncated.
 *
 * @cssstate blank - The combobox is empty.
 * @cssstate disabled - The combobox is disabled.
 */
export default class WaCombobox extends WebAwesomeFormAssociatedElement {
    static css: import("lit").CSSResult[];
    static get validators(): import("$webawesome/internal/webawesome-form-associated-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    assumeInteractionOn: string[];
    private createOptionEl;
    private hasInputSinceOpening;
    private readonly hasSlotController;
    private readonly localize;
    private listboxId;
    private selectionOrder;
    private slotChangePending;
    private cachedOptions;
    popup: WaPopup;
    combobox: HTMLSlotElement;
    comboboxInput: HTMLInputElement;
    valueInput: HTMLInputElement;
    listbox: HTMLSlotElement;
    liveRegion: HTMLElement;
    /** Where to anchor native constraint validation */
    get validationTarget(): HTMLInputElement;
    currentOption: WaOption;
    selectedOptions: WaOption[];
    optionValues: Set<string | null> | undefined;
    filteredOptions: WaOption[];
    /** The current text value in the input field. */
    inputValue: string;
    /** The name of the combobox, submitted as a name/value pair with form data. */
    name: string;
    private _defaultValue;
    set defaultValue(val: null | string | string[]);
    get defaultValue(): null | string | string[];
    /**
     * A converter for defaultValue from array to string if its multiple. Also fixes some hydration issues.
     */
    private convertDefaultValue;
    private _value;
    /** The combobox's value. This will be a string for single select or an array for multi-select. */
    set value(val: string | string[] | null);
    get value(): string | string[] | null;
    /** The combobox's size. */
    size: 'small' | 'medium' | 'large';
    /** Placeholder text to show as a hint when the combobox is empty. */
    placeholder: string;
    /** Allows more than one option to be selected. */
    multiple: boolean;
    /**
     * The maximum number of selected options to show when `multiple` is true. After the maximum, "+n" will be shown to
     * indicate the number of additional items that are selected. Set to 0 to remove the limit.
     */
    maxOptionsVisible: number;
    /** Disables the combobox control. */
    disabled: boolean;
    /** Adds a clear button when the combobox is not empty. */
    withClear: boolean;
    /**
     * Indicates whether or not the combobox is open. You can toggle this attribute to show and hide the menu, or you can
     * use the `show()` and `hide()` methods and this attribute will reflect the combobox's open state.
     */
    open: boolean;
    /** The combobox's visual appearance. */
    appearance: 'filled' | 'outlined' | 'filled-outlined';
    /** Draws a pill-style combobox with rounded edges. */
    pill: boolean;
    /** The combobox's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /**
     * The preferred placement of the combobox's menu. Note that the actual placement may vary as needed to keep the
     * listbox inside of the viewport.
     */
    placement: 'top' | 'bottom';
    /** The combobox's hint. If you need to display HTML, use the `hint` slot instead. */
    hint: string;
    /**
     * Used for SSR purposes when a label is slotted in. Will show the label on first render.
     */
    withLabel: boolean;
    /**
     * Used for SSR purposes when hint is slotted in. Will show the hint on first render.
     */
    withHint: boolean;
    /** The combobox's required attribute. */
    required: boolean;
    /**
     * When true, allows the user to enter a value that doesn't match any of the options. Only applies to single-select
     * comboboxes. When false, the combobox will only accept values that match an option.
     */
    allowCustomValue: boolean;
    /**
     * When true, if the user types text that doesn't match any existing option, a "Create [value]" option appears in the
     * listbox. Selecting it creates a new `<wa-option>` in the DOM and selects it. A cancelable `wa-create` event fires
     * before creation.
     */
    allowCreate: boolean;
    /**
     * A function that customizes how options are filtered based on the input value. The function receives the option
     * and the current input query string. Return `true` to include the option in the filtered list, `false` to exclude.
     * By default, options are filtered by checking if the option's label contains the query (case-insensitive).
     */
    filter: ((option: WaOption, query: string) => boolean) | null;
    /** Controls whether and how text input is automatically capitalized as it is entered/edited by the user. */
    autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    /**
     * Indicates whether the browser's autocorrect feature is on or off. When set as an attribute, use `"off"` or `"on"`.
     * When set as a property, use `true` or `false`.
     */
    autocorrect: boolean;
    /**
     * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
     * keyboard on supportive devices.
     */
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /** Used to customize the label or icon of the Enter key on virtual keyboards. */
    enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    /** Enables spell checking on the combobox. */
    spellcheck: boolean;
    /**
     * A function that customizes the tags to be rendered when multiple=true. The first argument is the option, the second
     * is the current tag's index.  The function should return either a Lit TemplateResult or a string containing trusted
     * HTML of the symbol to render at the specified value.
     */
    getTag: (option: WaOption, index: number) => TemplateResult | string | HTMLElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private updateDefaultValue;
    private addOpenListeners;
    private removeOpenListeners;
    private handleFocus;
    private handleBlur;
    private handleDocumentFocusIn;
    private handleDocumentKeyDown;
    private handleDocumentMouseDown;
    private handleLabelClick;
    private handleComboboxClick;
    private handleComboboxMouseDown;
    private handleComboboxKeyDown;
    private handleInputChange;
    private handleClearClick;
    private handleClearMouseDown;
    private handleOptionClick;
    handleDefaultSlotChange(): void;
    private processSlotChange;
    private handleTagRemove;
    private getAllOptions;
    private getRealOptions;
    private updateCreateOption;
    private removeCreateOption;
    private handleCreateOptionSelected;
    private getVisibleOptions;
    private getFirstVisibleOption;
    private updateFilteredOptions;
    private setCurrentOption;
    private setSelectedOptions;
    private toggleOptionSelection;
    private announceOption;
    private announceFilterResults;
    selectionChanged(): void;
    protected get tags(): (import("lit-html/directive.js").DirectiveResult<typeof import("lit-html/directives/unsafe-html.js").UnsafeHTMLDirective> | null)[];
    updated(changedProperties: PropertyValues<this>): void;
    handleDisabledChange(): void;
    handleValueChange(): void;
    handleOpenChange(): Promise<void>;
    /** Shows the listbox. */
    show(): Promise<void>;
    /** Hides the listbox. */
    hide(): Promise<void>;
    /** Sets focus on the control. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the control. */
    blur(): void;
    formResetCallback(): void;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-combobox': WaCombobox;
    }
}
