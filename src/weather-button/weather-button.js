
class weatherButton extends HTMLElement {
  constructor(){
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
  }
  connectedCallback(){
    this._shadowRoot.innerHTML = tempHtml;
    this.style['width'] = '54px';
    this.style['height'] = '54px';
  }
  disconnectedCallback(){

  }
  attributeChangedCallback(){

  }
  adoptedCallback(){

  }

}
if(!customElements.get('weather-button')){
  customElements.define('weather-button', weatherButton);
}
