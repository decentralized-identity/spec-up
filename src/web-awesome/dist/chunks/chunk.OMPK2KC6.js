/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaErrorEvent
} from "./chunk.ESI5P3UH.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  avatar_styles_default
} from "./chunk.UK3O4NPY.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/avatar/avatar.ts
import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
var WaAvatar = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.hasError = false;
    this.image = "";
    this.label = "";
    this.initials = "";
    this.loading = "eager";
    this.shape = "circle";
  }
  handleImageChange() {
    this.hasError = false;
  }
  handleImageLoadError() {
    this.hasError = true;
    this.dispatchEvent(new WaErrorEvent());
  }
  render() {
    const avatarWithImage = html`
      <img
        part="image"
        class="image"
        src="${this.image}"
        loading="${this.loading}"
        role="img"
        aria-label=${this.label}
        @error="${this.handleImageLoadError}"
      />
    `;
    let avatarWithoutImage = html``;
    if (this.initials) {
      avatarWithoutImage = html`<div part="initials" class="initials" role="img" aria-label=${this.label}>
        ${this.initials}
      </div>`;
    } else {
      avatarWithoutImage = html`
        <slot name="icon" part="icon" class="icon" role="img" aria-label=${this.label}>
          <wa-icon name="user" library="system" variant="solid"></wa-icon>
        </slot>
      `;
    }
    return html` ${this.image && !this.hasError ? avatarWithImage : avatarWithoutImage} `;
  }
};
WaAvatar.css = avatar_styles_default;
__decorateClass([
  state()
], WaAvatar.prototype, "hasError", 2);
__decorateClass([
  property()
], WaAvatar.prototype, "image", 2);
__decorateClass([
  property()
], WaAvatar.prototype, "label", 2);
__decorateClass([
  property()
], WaAvatar.prototype, "initials", 2);
__decorateClass([
  property()
], WaAvatar.prototype, "loading", 2);
__decorateClass([
  property({ reflect: true })
], WaAvatar.prototype, "shape", 2);
__decorateClass([
  watch("image")
], WaAvatar.prototype, "handleImageChange", 1);
WaAvatar = __decorateClass([
  customElement("wa-avatar")
], WaAvatar);

export {
  WaAvatar
};
