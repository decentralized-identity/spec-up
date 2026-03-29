import { WebAwesomeFormAssociatedElement } from '$webawesome/internal/webawesome-form-associated-element.js';
import type { PropertyValues } from 'lit';
import '../button/button.js';
import '../format-bytes/format-bytes.js';
import '../icon/icon.js';
/**
 * @summary File inputs allow users to select files from their device.
 * @documentation https://webawesome.com/docs/components/file-input
 * @status experimental
 * @since 3.2
 *
 * @dependency wa-button
 * @dependency wa-icon
 * @dependency wa-format-bytes
 *
 * @slot label - The file input's label. Alternatively, you can use the `label` attribute.
 * @slot hint - Text that describes how to use the file input. Alternatively, you can use the `hint` attribute.
 * @slot dropzone - Custom content to show in the dropzone.
 * @slot file-icon - Custom icon for non-image files.
 *
 * @event change - Emitted when files are added or removed.
 * @event input - Emitted when file selection changes.
 * @event focus - Emitted when the dropzone gains focus.
 * @event blur - Emitted when the dropzone loses focus.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart label - The label element.
 * @csspart hint - The hint element.
 * @csspart base - The main component wrapper.
 * @csspart dropzone - The drag-and-drop area.
 * @csspart dropzone-icon - The upload icon in the dropzone.
 * @csspart dropzone-text - The instruction text in the dropzone.
 * @csspart file-list - The container for selected files.
 * @csspart file - Individual file item container.
 * @csspart file-thumbnail - The thumbnail/icon container for a file.
 * @csspart file-image - The image element for image thumbnails.
 * @csspart file-icon - The icon for non-image files.
 * @csspart file-details - Container for file name and size.
 * @csspart file-name - The file name text.
 * @csspart file-size - The file size text.
 * @csspart remove-button - The remove button for each file.
 *
 * @cssstate blank - No files selected.
 * @cssstate dragging - Files being dragged over dropzone.
 */
export default class WaFileInput extends WebAwesomeFormAssociatedElement {
    static css: import("lit").CSSResult[];
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    static get validators(): import("$webawesome/internal/webawesome-form-associated-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    private readonly localize;
    private objectUrls;
    dropzone: HTMLLabelElement;
    input: HTMLInputElement;
    /** The selected files. */
    files: File[];
    /** Whether files are being dragged over the dropzone. */
    dragging: boolean;
    /** The file input's size. */
    size: 'small' | 'medium' | 'large';
    /** The file input's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /** The file input's hint. If you need to display HTML, use the `hint` slot instead. */
    hint: string;
    /** Allows more than one file to be selected. */
    multiple: boolean;
    /**
     * A comma-separated list of acceptable file types. Must be a list of
     * [unique file type specifiers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers).
     */
    accept: string;
    /** Makes the file input a required field. */
    required: boolean;
    /**
     * Used for SSR. Will determine if the SSRed component will have the label slot rendered on initial paint.
     */
    withLabel: boolean;
    /**
     * Used for SSR. Will determine if the SSRed component will have the hint slot rendered on initial paint.
     */
    withHint: boolean;
    /** The number of selected files. Used for validation. */
    get fileCount(): number;
    disconnectedCallback(): void;
    updated(changedProperties: PropertyValues<this>): void;
    formResetCallback(): void;
    /** Sets focus on the file input. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the file input. */
    blur(): void;
    private revokeAllObjectUrls;
    private getObjectUrl;
    private revokeObjectUrl;
    private updateFormValue;
    private handleDragEnter;
    private handleDragOver;
    private handleDragLeave;
    private handleDrop;
    private handleInputChange;
    private addFiles;
    private removeFile;
    private fileMatchesAccept;
    private isImage;
    private getFileIcon;
    private renderFile;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-file-input': WaFileInput;
    }
}
