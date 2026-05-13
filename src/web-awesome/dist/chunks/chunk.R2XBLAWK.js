/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/events/after-expand.ts
var WaAfterExpandEvent = class extends Event {
  constructor() {
    super("wa-after-expand", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  WaAfterExpandEvent
};
