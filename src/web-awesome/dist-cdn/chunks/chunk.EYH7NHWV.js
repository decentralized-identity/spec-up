/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/events/after-collapse.ts
var WaAfterCollapseEvent = class extends Event {
  constructor() {
    super("wa-after-collapse", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  WaAfterCollapseEvent
};
