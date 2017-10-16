import {WeatherApi} from './weather-api.js';
import './weather-card.js';
import './weather-button.js';
class weatherCardList extends HTMLElement {
  constructor(){
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this.__weatherApi = new WeatherApi();
    this.cities = ['Dallas'];

    // this.cities = ['London,uk','Dallas','Rome,it','Chicago','Munich'];
  }
  connectedCallback(){
    this._shadowRoot.innerHTML = tempHtml;
    this.__city = this._shadowRoot.querySelector('.city');
    window.localforage.getItem('selectedCities').then((cityList) =>{
      if(cityList){
        this.cities = cityList;
      }
      this.cities.map((city)=>{
        this.__renderCity(city);
      });
    });
    this._shadowRoot.querySelector('weather-button').addEventListener('click',this.__addCity.bind(this));
  }
  disconnectedCallback(){

  }
  attributeChangedCallback(){

  }
  adoptedCallback(){

  }
  __addCity(){
    if(this.__city.value.trim()){
      this.__renderCity(this.__city.value);
      this.__saveCity(this.__city.value);
      this.__city.value = '';
    }
  }
  __saveCity(city){
    this.cities.push(city);
    window.localforage.setItem('selectedCities',this.cities);
  }
  __removeCity(city){
    this.cities = this.cities.filter((item)=>{
      return item.toLowerCase() !== city.toLowerCase();
    });
    window.localforage.setItem('selectedCities',this.cities);
  }
  __renderCity(city){
    this.__weatherApi.getWeather(city, true).then((data) => {
      const card = document.createElement('weather-card');
      card.weatherData = data;
      this._shadowRoot.appendChild(card);
      card.addEventListener('deleteCard', (event)=>{
        this.__removeCity(event.detail._weatherData.name);
        this._shadowRoot.removeChild(event.detail);
      });
      return card.innerText;
    });
  }

}
if(!customElements.get('weather-card-list')){
  customElements.define('weather-card-list', weatherCardList);
}
