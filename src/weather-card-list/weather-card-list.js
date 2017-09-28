import {WeatherApi} from './weather-api.js';
import './weather-card.js';
class weatherCardList extends HTMLElement {
  constructor(){
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this.__weatherApi = new WeatherApi();
    this.cities = ['London,uk','Dallas','Rome,it','Chicago','Munich'];
  }
  connectedCallback(){
    this._shadowRoot.innerHTML = tempHtml;
    // this._shadowRoot.innerHTML = '';
    this.cities.map((city)=>{
      this.__weatherApi.getWeather(city, true).then((data) => {
        const card = document.createElement('weather-card');
        card.weatherData = data;
        this._shadowRoot.appendChild(card);
        return card.innerText;
      });
    });
  }
  disconnectedCallback(){

  }
  attributeChangedCallback(){

  }
  adoptedCallback(){

  }

}
if(!customElements.get('weather-card-list')){
  customElements.define('weather-card-list', weatherCardList);
}
