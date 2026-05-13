/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/components/tab-panel/tab-panel.styles.ts
import { css } from "lit";
var tab_panel_styles_default = css`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`;

export {
  tab_panel_styles_default
};
