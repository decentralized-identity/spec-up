/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */

// _bundle_/src/internal/math.ts
import { nanoid } from "nanoid";
function clamp(value, min, max) {
  const noNegativeZero = (n) => Object.is(n, -0) ? 0 : n;
  if (value < min) {
    return noNegativeZero(min);
  }
  if (value > max) {
    return noNegativeZero(max);
  }
  return noNegativeZero(value);
}
function uniqueId(prefix = "") {
  return `${prefix}${nanoid()}`;
}

export {
  clamp,
  uniqueId
};
