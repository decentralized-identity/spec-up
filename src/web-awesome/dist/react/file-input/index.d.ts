import Component from '../../components/file-input/file-input.js';
import { type EventName } from '@lit/react';
import type { WaInvalidEvent } from '../../events/events.js';
export type { WaInvalidEvent } from '../../events/events.js';
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
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
