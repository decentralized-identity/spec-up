
customElements.define('slide-panels', class PanelSet extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }
  constructor() {
    super();
    
    this.addEventListener('pointerup', e => {
      if (e.target === this) this.close();
    })
  }
  get active (){
    return this.getAttribute('open');
  }
  toggle(panel){
    this.active === panel ? this.close() : this.open(panel)
  }
  open (panel){
    this.setAttribute('open', panel);
  }
  close (){
    this.removeAttribute('open');
  }
  attributeChangedCallback(attr, last, current) {
    switch(attr) {
      case 'open': for (let child of this.children) {
        if (child.id === current) child.setAttribute('open', '');
        else child.removeAttribute('open', '');
      }
      break;
    }
  }
});