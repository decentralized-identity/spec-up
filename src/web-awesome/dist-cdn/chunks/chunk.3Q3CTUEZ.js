/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  i
} from "./chunk.7OBLIRXR.js";

// _bundle_/src/components/file-input/file-input.styles.ts
var file_input_styles_default = i`
  :host {
    display: block;
  }

  /* Dropzone */
  .dropzone {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--wa-space-m);
    padding: var(--wa-space-l);
    border: max(1px, var(--wa-form-control-border-width)) dashed var(--wa-form-control-border-color);
    border-radius: var(--wa-panel-border-radius);
    background: var(--wa-form-control-background-color);
    color: var(--wa-color-text-quiet);
    text-align: center;
    cursor: pointer;
    transition:
      border-color var(--wa-transition-fast),
      background-color var(--wa-transition-fast),
      color var(--wa-transition-fast);

    &:focus {
      outline: none;
    }

    &:has(input:focus-visible) {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }

    &.dragging {
      border-style: solid;
      border-color: var(--wa-color-brand-border-loud);
      background-color: var(--wa-color-brand-fill-quiet);
      color: var(--wa-color-brand-on-quiet);
    }

    /* Invisible overlay to prevent dragleave from firing on child elements */
    &::after {
      position: absolute;
      inset: 0;
      content: '';
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .dropzone-icon {
    font-size: 2em;
  }

  .dropzone-text {
    font-weight: var(--wa-font-weight-action);
  }

  /* Hidden file input - positioned to fill the dropzone for proper validation popup anchoring */
  .hidden-input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
  }

  .hidden-input::file-selector-button {
    display: none;
  }

  /* File list */
  .file-list {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-block-start: var(--wa-space-m);
  }

  .file {
    display: flex;
    align-items: center;
    gap: var(--wa-space-m);
    padding: var(--wa-space-m);
    border: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    background: var(--wa-color-surface-default);
  }

  .file + .file {
    margin-block-start: var(--wa-space-xs);
  }

  /* Thumbnail */
  .file-thumbnail {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    height: 3em;
    border-radius: var(--wa-border-radius-s);
    overflow: hidden;
    background: var(--wa-color-neutral-fill-quiet);

    wa-icon {
      font-size: 1.25em;
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .file-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* File details */
  .file-details {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .file-name {
    font-weight: var(--wa-form-control-value-font-weight);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .file-size {
    font-size: var(--wa-font-size-smaller);
    color: var(--wa-color-text-quiet);
  }

  /* Remove button */
  .remove-button {
    flex: 0 0 auto;
  }

  /* Size variants */
  :host([size='small']) .dropzone {
    gap: var(--wa-space-s);
    padding: var(--wa-space-m);
  }

  :host([size='large']) .dropzone {
    gap: var(--wa-space-l);
    padding: var(--wa-space-xl);
  }

  :host([size='small']) .file {
    gap: var(--wa-space-s);
    padding: var(--wa-space-s);
  }

  :host([size='large']) .file {
    gap: var(--wa-space-l);
    padding: var(--wa-space-l);
  }

  /* Disabled state */
  :host([disabled]) .file {
    opacity: 0.5;
  }

  /* Hide file list when empty */
  :host(:state(blank)) .file-list {
    display: none;
  }
`;

export {
  file_input_styles_default
};
