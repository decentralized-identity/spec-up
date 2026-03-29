customElements.define('tab-panels', class TabPanels extends HTMLElement {
  constructor() {
    super();

    globalThis.delegateEvent('click', 'tab-panels > nav > *', (event, delegate) => {
      const nav = delegate.parentElement;

      if (nav.parentElement === this) {
        this.setAttribute('selected-index', Array.prototype.indexOf.call(nav.children, delegate));
      }
    }, { container: this, passive: true });
  }

  static get observedAttributes() {
    return ['selected-index'];
  }

  attributeChangedCallback(attr, last, current) {
    globalThis.domReady.then(() => {
      switch (attr) {
        case 'selected-index': {
          const index = current || 0;
          const nav = this.querySelector('nav');

          if (nav.parentElement !== this) {
            return;
          }

          const tabs = nav.children;
          const selected = tabs[index];

          for (const tab of tabs) {
            tab.removeAttribute('selected');
          }

          if (selected) {
            selected.setAttribute('selected', '');
          }

          const panel = Array.prototype.filter.call(this.children, node => {
            if (node.tagName === 'SECTION') {
              node.removeAttribute('selected');
              return true;
            }

            return false;
          })[index];

          if (panel) {
            panel.setAttribute('selected', '');
          }
          break;
        }
      }
    });
  }
});
