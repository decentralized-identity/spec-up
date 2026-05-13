/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/events/error.ts
var WaErrorEvent = class extends Event {
  constructor() {
    super("wa-error", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  WaErrorEvent
};
