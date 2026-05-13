/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/events/start.ts
var WaStartEvent = class extends Event {
  constructor() {
    super("wa-start", { bubbles: true, cancelable: false, composed: true });
  }
};

export {
  WaStartEvent
};
