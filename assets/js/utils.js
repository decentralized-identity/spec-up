globalThis.delegateEvent = function delegateEvent(type, selector, fn, options = {}){
  return (options.container || document).addEventListener(type, e => {
    let match = e.target.closest(selector);
    if (match) fn(e, match);
  }, options);
};

globalThis.skipAnimationFrame = fn => requestAnimationFrame(() => requestAnimationFrame(fn));

globalThis.domReady = new Promise(resolve => {
  document.addEventListener('DOMContentLoaded', e => resolve());
});
