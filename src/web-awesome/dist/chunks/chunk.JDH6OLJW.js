/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  carousel_item_styles_default
} from "./chunk.6OWGV6VZ.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/carousel-item/carousel-item.ts
import { html } from "lit";
import { customElement } from "lit/decorators.js";
var WaCarouselItem = class extends WebAwesomeElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "group");
  }
  render() {
    return html` <slot></slot> `;
  }
};
WaCarouselItem.css = carousel_item_styles_default;
WaCarouselItem = __decorateClass([
  customElement("wa-carousel-item")
], WaCarouselItem);

export {
  WaCarouselItem
};
