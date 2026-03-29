/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  file_input_styles_default
} from "./chunk.3Q3CTUEZ.js";
import {
  RequiredValidator
} from "./chunk.JPXNJ5XW.js";
import {
  form_control_styles_default
} from "./chunk.Y5LJWEUS.js";
import {
  WebAwesomeFormAssociatedElement
} from "./chunk.3ZTA22M4.js";
import {
  HasSlotController
} from "./chunk.ROLIHZR6.js";
import {
  size_styles_default
} from "./chunk.7Y5AJDPW.js";
import {
  e as e2
} from "./chunk.KWDPKKFO.js";
import {
  o as o2
} from "./chunk.3MSWQ3RG.js";
import {
  LocalizeController
} from "./chunk.5EW4WF6V.js";
import {
  e,
  n,
  r,
  t
} from "./chunk.JB4GDECI.js";
import {
  o
} from "./chunk.7OBLIRXR.js";
import {
  x
} from "./chunk.BKE5EYM3.js";
import {
  __decorateClass
} from "./chunk.JHZRD2LV.js";

// _bundle_/src/components/file-input/file-input.ts
var nativeFileInput = o ? null : Object.assign(document.createElement("input"), { type: "file", required: true });
var WaFileInput = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["change"];
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController(this);
    this.objectUrls = /* @__PURE__ */ new Map();
    this.files = [];
    this.dragging = false;
    this.size = "medium";
    this.label = "";
    this.hint = "";
    this.multiple = false;
    this.accept = "";
    this.required = false;
    this.withLabel = false;
    this.withHint = false;
  }
  static get validators() {
    const validators = o ? [] : [
      RequiredValidator({
        validationProperty: "fileCount",
        validationElement: nativeFileInput
      })
    ];
    return [...super.validators, ...validators];
  }
  /** The number of selected files. Used for validation. */
  get fileCount() {
    return this.files.length;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.revokeAllObjectUrls();
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("files")) {
      this.customStates.set("blank", this.files.length === 0);
      this.updateFormValue();
    }
    if (changedProperties.has("dragging")) {
      this.customStates.set("dragging", this.dragging);
    }
  }
  formResetCallback() {
    this.files = [];
    this.revokeAllObjectUrls();
    super.formResetCallback();
  }
  /** Sets focus on the file input. */
  focus(options) {
    this.input?.focus(options);
  }
  /** Removes focus from the file input. */
  blur() {
    this.input?.blur();
  }
  revokeAllObjectUrls() {
    for (const url of this.objectUrls.values()) {
      URL.revokeObjectURL(url);
    }
    this.objectUrls.clear();
  }
  getObjectUrl(file) {
    if (!this.objectUrls.has(file)) {
      this.objectUrls.set(file, URL.createObjectURL(file));
    }
    return this.objectUrls.get(file);
  }
  revokeObjectUrl(file) {
    const url = this.objectUrls.get(file);
    if (url) {
      URL.revokeObjectURL(url);
      this.objectUrls.delete(file);
    }
  }
  updateFormValue() {
    if (this.files.length === 0) {
      this.setValue(null, null);
    } else if (this.files.length === 1 && !this.multiple) {
      this.setValue(this.files[0], this.files[0]);
    } else {
      const formData = new FormData();
      this.files.forEach((file) => {
        if (this.name) {
          formData.append(this.name, file);
        }
      });
      this.setValue(formData, formData);
    }
  }
  handleDragEnter(event) {
    event.preventDefault();
    if (!this.disabled) {
      this.dragging = true;
    }
  }
  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
  }
  handleDragLeave(event) {
    event.preventDefault();
    this.dragging = false;
  }
  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.dragging = false;
    if (this.disabled || !event.dataTransfer?.items) {
      return;
    }
    const items = event.dataTransfer.items;
    const entryQueue = [];
    const filesToAdd = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === "file") {
        const entry = items[i].webkitGetAsEntry();
        if (entry) {
          entryQueue.push(entry);
        }
      }
    }
    const processQueue = async () => {
      while (entryQueue.length > 0) {
        if (!this.multiple && filesToAdd.length > 0) {
          break;
        }
        const currentEntry = entryQueue.shift();
        if (currentEntry.isFile) {
          await new Promise((resolve) => {
            currentEntry.file((file) => {
              if (this.fileMatchesAccept(file)) {
                filesToAdd.push(file);
              }
              resolve();
            });
          });
        } else if (currentEntry.isDirectory) {
          const reader = currentEntry.createReader();
          let entries = [];
          do {
            entries = await new Promise((resolve) => {
              reader.readEntries((results) => resolve(results));
            });
            entryQueue.unshift(...entries);
          } while (entries.length > 0);
        }
      }
      this.addFiles(filesToAdd);
    };
    processQueue();
  }
  handleInputChange() {
    if (this.input.files) {
      const newFiles = Array.from(this.input.files).filter((file) => this.fileMatchesAccept(file));
      this.addFiles(newFiles);
    }
    this.input.value = "";
  }
  addFiles(newFiles) {
    if (newFiles.length === 0) {
      return;
    }
    if (this.multiple) {
      this.files = [...this.files, ...newFiles];
    } else {
      this.revokeAllObjectUrls();
      this.files = [newFiles[0]];
    }
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }
  removeFile(index) {
    const file = this.files[index];
    this.revokeObjectUrl(file);
    this.files = this.files.filter((_, i) => i !== index);
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }
  fileMatchesAccept(file) {
    if (!this.accept) {
      return true;
    }
    const acceptTypes = this.accept.split(",").map((type) => type.trim().toLowerCase());
    const fileName = file.name.toLowerCase();
    const mimeType = file.type.toLowerCase();
    return acceptTypes.some((accept) => {
      if (accept.startsWith(".")) {
        return fileName.endsWith(accept);
      }
      if (accept.endsWith("/*")) {
        const baseType = accept.slice(0, -2);
        return mimeType.startsWith(baseType + "/");
      }
      return mimeType === accept;
    });
  }
  isImage(file) {
    return file.type.startsWith("image/");
  }
  getFileIcon(file) {
    const type = file.type.toLowerCase();
    if (type.startsWith("image/")) return "file-image";
    if (type.startsWith("audio/")) return "file-audio";
    if (type.startsWith("video/")) return "file-video";
    if (type.includes("pdf")) return "file-pdf";
    if (type.includes("zip") || type.includes("compressed") || type.includes("archive")) return "file-zipper";
    if (type.includes("word") || type.includes("document")) return "file-word";
    if (type.includes("excel") || type.includes("spreadsheet")) return "file-excel";
    if (type.includes("powerpoint") || type.includes("presentation")) return "file-powerpoint";
    if (type.startsWith("text/") || type.includes("javascript") || type.includes("json")) return "file-code";
    return "file";
  }
  renderFile(file, index) {
    const isImage = this.isImage(file);
    const iconName = this.getFileIcon(file);
    return x`
      <li part="file" class="file">
        <span part="file-thumbnail" class="file-thumbnail">
          ${isImage ? x`<img part="file-image" class="file-image" src=${this.getObjectUrl(file)} alt="" />` : x`
                <slot name="file-icon">
                  <wa-icon part="file-icon" library="system" name=${iconName}></wa-icon>
                </slot>
              `}
        </span>

        <span part="file-details" class="file-details">
          <span part="file-name" class="file-name">${file.name}</span>
          <span part="file-size" class="file-size">
            <wa-format-bytes .value=${file.size}></wa-format-bytes>
          </span>
        </span>

        <wa-button
          part="remove-button"
          exportparts="base:remove-button__base"
          class="remove-button"
          appearance="plain"
          size=${this.size}
          @click=${() => this.removeFile(index)}
          ?disabled=${this.disabled}
        >
          <wa-icon name="xmark" label=${this.localize.term("remove")} library="system"></wa-icon>
        </wa-button>
      </li>
    `;
  }
  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test("label") : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test("hint") : this.withHint;
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    return x`
      <label
        part="form-control-label label"
        class=${e2({
      label: true,
      "has-label": hasLabel
    })}
        aria-hidden=${hasLabel ? "false" : "true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="file-input">
        <label
          id="dropzone"
          part="dropzone"
          for="file-input"
          class=${e2({
      dropzone: true,
      dragging: this.dragging,
      disabled: this.disabled
    })}
          @dragenter=${this.handleDragEnter}
          @dragover=${this.handleDragOver}
          @dragleave=${this.handleDragLeave}
          @drop=${this.handleDrop}
        >
          <slot name="dropzone">
            <wa-icon part="dropzone-icon" class="dropzone-icon" name="upload" library="system"></wa-icon>
            <span part="dropzone-text" class="dropzone-text">
              ${this.multiple ? this.localize.term("dropFilesHere") : this.localize.term("dropFileHere")}
            </span>
          </slot>

          <input
            id="file-input"
            type="file"
            class="hidden-input"
            ?multiple=${this.multiple}
            ?disabled=${this.disabled}
            accept=${o2(this.accept || void 0)}
            aria-describedby="hint"
            @change=${this.handleInputChange}
          />
        </label>

        <slot
          id="hint"
          part="hint"
          name="hint"
          class=${e2({
      hint: true,
      "has-hint": hasHint
    })}
          aria-hidden=${hasHint ? "false" : "true"}
          >${this.hint}</slot
        >

        ${this.files.length > 0 ? x`
              <ul part="file-list" class="file-list" role="list">
                ${this.files.map((file, index) => this.renderFile(file, index))}
              </ul>
            ` : ""}
      </div>
    `;
  }
};
WaFileInput.css = [size_styles_default, form_control_styles_default, file_input_styles_default];
WaFileInput.shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
__decorateClass([
  e("#dropzone")
], WaFileInput.prototype, "dropzone", 2);
__decorateClass([
  e("#file-input")
], WaFileInput.prototype, "input", 2);
__decorateClass([
  r()
], WaFileInput.prototype, "files", 2);
__decorateClass([
  r()
], WaFileInput.prototype, "dragging", 2);
__decorateClass([
  n({ reflect: true })
], WaFileInput.prototype, "size", 2);
__decorateClass([
  n()
], WaFileInput.prototype, "label", 2);
__decorateClass([
  n()
], WaFileInput.prototype, "hint", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaFileInput.prototype, "multiple", 2);
__decorateClass([
  n()
], WaFileInput.prototype, "accept", 2);
__decorateClass([
  n({ type: Boolean, reflect: true })
], WaFileInput.prototype, "required", 2);
__decorateClass([
  n({ attribute: "with-label", type: Boolean })
], WaFileInput.prototype, "withLabel", 2);
__decorateClass([
  n({ attribute: "with-hint", type: Boolean })
], WaFileInput.prototype, "withHint", 2);
WaFileInput = __decorateClass([
  t("wa-file-input")
], WaFileInput);

export {
  WaFileInput
};
