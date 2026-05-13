/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaErrorEvent
} from "./chunk.ESI5P3UH.js";
import {
  WaLoadEvent
} from "./chunk.WOJAFYXB.js";
import {
  watch
} from "./chunk.U7CMGUQU.js";
import {
  LocalizeController
} from "./chunk.OK6DMFIY.js";
import {
  animated_image_styles_default
} from "./chunk.GIKM6FQ4.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/animated-image/animated-image.ts
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
var WaAnimatedImage = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.isLoaded = false;
  }
  handleClick() {
    this.play = !this.play;
  }
  handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.play = !this.play;
    }
  }
  handleLoad() {
    const canvas = document.createElement("canvas");
    const { width, height } = this.animatedImage;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(this.animatedImage, 0, 0, width, height);
    this.frozenFrame = canvas.toDataURL("image/gif");
    if (!this.isLoaded) {
      this.dispatchEvent(new WaLoadEvent());
      this.isLoaded = true;
    }
  }
  handleError() {
    this.dispatchEvent(new WaErrorEvent());
  }
  handlePlayChange() {
    if (this.play) {
      this.animatedImage.src = "";
      this.animatedImage.src = this.src;
    }
  }
  handleSrcChange() {
    this.isLoaded = false;
  }
  render() {
    const verb = this.localize.term(this.play ? "pauseAnimation" : "playAnimation");
    const label = `${verb} ${this.alt}`;
    return html`
      <div
        class="animated-image"
        tabindex="0"
        role="button"
        aria-pressed=${this.play ? "true" : "false"}
        aria-label=${label}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <img
          class="animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play ? "false" : "true"}
          role="presentation"
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded ? html`
              <img
                class="frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play ? "true" : "false"}
                role="presentation"
              />

              <div part="control-box" class="control-box" aria-hidden="true">
                <slot name="play-icon">
                  <wa-icon
                    name="play"
                    library="system"
                    variant="solid"
                    class="default"
                    style=${styleMap({ "margin-inline-start": "3px" })}
                  ></wa-icon>
                </slot>
                <slot name="pause-icon">
                  <wa-icon name="pause" library="system" variant="solid" class="default"></wa-icon>
                </slot>
              </div>
            ` : ""}
      </div>
    `;
  }
};
WaAnimatedImage.css = animated_image_styles_default;
__decorateClass([
  query(".animated")
], WaAnimatedImage.prototype, "animatedImage", 2);
__decorateClass([
  state()
], WaAnimatedImage.prototype, "frozenFrame", 2);
__decorateClass([
  state()
], WaAnimatedImage.prototype, "isLoaded", 2);
__decorateClass([
  property()
], WaAnimatedImage.prototype, "src", 2);
__decorateClass([
  property()
], WaAnimatedImage.prototype, "alt", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaAnimatedImage.prototype, "play", 2);
__decorateClass([
  watch("play", { waitUntilFirstUpdate: true })
], WaAnimatedImage.prototype, "handlePlayChange", 1);
__decorateClass([
  watch("src")
], WaAnimatedImage.prototype, "handleSrcChange", 1);
WaAnimatedImage = __decorateClass([
  customElement("wa-animated-image")
], WaAnimatedImage);

export {
  WaAnimatedImage
};
