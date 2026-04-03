/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  i
} from "./chunk.7OBLIRXR.js";

// _bundle_/src/components/sparkline/sparkline.styles.ts
var sparkline_styles_default = i`
  @layer wa-component {
    :host {
      --fill-color: var(--wa-color-brand-fill-normal);
      --line-color: var(--wa-color-brand-border-loud);
      --line-width: 2;

      display: inline-block;
      width: auto;
      height: 1em;
      aspect-ratio: 4 / 1;
      vertical-align: middle;
      flex: 0 0 auto;
    }

    /* Trend color variants */
    :host([trend='positive']) {
      --fill-color: var(--wa-color-success-fill-normal);
      --line-color: var(--wa-color-success-border-loud);
    }

    :host([trend='negative']) {
      --fill-color: var(--wa-color-danger-fill-normal);
      --line-color: var(--wa-color-danger-border-loud);
    }

    :host([trend='neutral']) {
      --fill-color: var(--wa-color-neutral-fill-normal);
      --line-color: var(--wa-color-neutral-border-loud);
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    /* RTL support: mirror the sparkline horizontally */
    :host(:dir(rtl)) svg {
      transform: scaleX(-1);
    }

    [part='line'] {
      fill: none;
      stroke: var(--line-color);
      stroke-width: var(--line-width);
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    [part='fill'] {
      stroke: none;
    }

    /* Appearance: gradient fill */
    :host([appearance='gradient']) [part='fill'] {
      fill: url(#sparkline-gradient);
    }

    /* Appearance: solid fill */
    :host([appearance='solid']) [part='fill'] {
      fill: var(--fill-color);
    }

    /* Appearance: line only (no fill) */
    :host([appearance='line']) [part='fill'] {
      display: none;
    }
  }
`;

export {
  sparkline_styles_default
};
