/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  scroller_styles_default
} from "./chunk.NVYORNDJ.js";
import {
  LocalizeController
} from "./chunk.OK6DMFIY.js";
import {
  WebAwesomeElement
} from "./chunk.YYVZ2GFW.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// _bundle_/src/components/scroller/scroller.ts
import { html } from "lit";
import { customElement, eventOptions, property, query, state } from "lit/decorators.js";
var WaScroller = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.resizeObserver = new ResizeObserver(() => this.updateScroll());
    this.canScroll = false;
    this.orientation = "horizontal";
    this.withoutScrollbar = false;
    this.withoutShadow = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
  }
  handleKeyDown(event) {
    if (event.key === "Home") {
      event.preventDefault();
      this.content.scrollTo({
        left: this.orientation === "horizontal" ? 0 : void 0,
        top: this.orientation === "vertical" ? 0 : void 0
      });
    }
    if (event.key === "End") {
      event.preventDefault();
      this.content.scrollTo({
        left: this.orientation === "horizontal" ? this.content.scrollWidth : void 0,
        top: this.orientation === "vertical" ? this.content.scrollHeight : void 0
      });
    }
  }
  handleSlotChange() {
    this.updateScroll();
  }
  updateScroll() {
    if (this.orientation === "horizontal") {
      const clientWidth = Math.ceil(this.content.clientWidth);
      const scrollLeft = Math.abs(Math.ceil(this.content.scrollLeft));
      const scrollWidth = Math.ceil(this.content.scrollWidth);
      const maxScroll = scrollWidth - clientWidth;
      this.canScroll = maxScroll > 0;
      const startShadowOpacity = Math.min(1, scrollLeft / (maxScroll * 0.05));
      const endShadowOpacity = Math.min(1, (maxScroll - scrollLeft) / (maxScroll * 0.05));
      this.style.setProperty("--start-shadow-opacity", String(startShadowOpacity || 0));
      this.style.setProperty("--end-shadow-opacity", String(endShadowOpacity || 0));
    } else {
      const clientHeight = Math.ceil(this.content.clientHeight);
      const scrollTop = Math.abs(Math.ceil(this.content.scrollTop));
      const scrollHeight = Math.ceil(this.content.scrollHeight);
      const maxScroll = scrollHeight - clientHeight;
      this.canScroll = maxScroll > 0;
      const startShadowOpacity = Math.min(1, scrollTop / (maxScroll * 0.05));
      const endShadowOpacity = Math.min(1, (maxScroll - scrollTop) / (maxScroll * 0.05));
      this.style.setProperty("--start-shadow-opacity", String(startShadowOpacity || 0));
      this.style.setProperty("--end-shadow-opacity", String(endShadowOpacity || 0));
    }
  }
  render() {
    return html`
      ${this.withoutShadow ? "" : html`
            <div id="start-shadow" part="start-shadow" aria-hidden="true"></div>
            <div id="end-shadow" part="end-shadow" aria-hidden="true"></div>
          `}

      <div
        id="content"
        part="content"
        role="region"
        aria-label=${this.localize.term("scrollableRegion")}
        aria-orientation=${this.orientation}
        tabindex=${this.canScroll ? "0" : "-1"}
        @keydown=${this.handleKeyDown}
        @scroll=${this.updateScroll}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
};
WaScroller.css = [scroller_styles_default];
__decorateClass([
  query("#content")
], WaScroller.prototype, "content", 2);
__decorateClass([
  state()
], WaScroller.prototype, "canScroll", 2);
__decorateClass([
  property({ reflect: true })
], WaScroller.prototype, "orientation", 2);
__decorateClass([
  property({ attribute: "without-scrollbar", type: Boolean, reflect: true })
], WaScroller.prototype, "withoutScrollbar", 2);
__decorateClass([
  property({ attribute: "without-shadow", type: Boolean, reflect: true })
], WaScroller.prototype, "withoutShadow", 2);
__decorateClass([
  eventOptions({ passive: true })
], WaScroller.prototype, "updateScroll", 1);
WaScroller = __decorateClass([
  customElement("wa-scroller")
], WaScroller);

export {
  WaScroller
};
