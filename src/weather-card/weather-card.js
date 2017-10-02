
class weatherCard extends HTMLElement {
  constructor(){
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
  }
  connectedCallback(){
    this._shadowRoot.innerHTML = tempHtml;
    this._header = this._shadowRoot.querySelector('.header');
    this._city = this._shadowRoot.querySelector('.header .city');
    this._close = this._shadowRoot.querySelector('.header .close');
    this._info = this._shadowRoot.querySelector('.info');
    this._icon = this._shadowRoot.querySelector('.icon');
    this._wind = this._shadowRoot.querySelector('.wind');
    this._humidity = this._shadowRoot.querySelector('.humidity');
    this._pressure = this._shadowRoot.querySelector('.pressure');
    this._close.addEventListener('click',()=>{
      this.dispatchEvent(new CustomEvent('deleteCard',{
        detail:this
      }));
    });
    this.__render();
  }
  disconnectedCallback(){

  }
  attributeChangedCallback(){

  }
  adoptedCallback(){

  }
  get weatherData(){
    return this._weatherData;
  }
  set weatherData(data){
    this._weatherData = data;
    this.__render();
  }
  __createIcon(icon){
    if(icon === '04d' ||icon === '03d') {
      icon = '02d';
    }
    return icon.replace('n','d');
  }
  __createWindDirection(deg){
    let direction = 'N';
    if(deg >= 22.5 && deg < 67.5){
      direction = 'NE';
    }
    if(deg >= 67.5 && deg < 112.5){
      direction = 'E';
    }
    if(deg >= 112.5 && deg < 157.5){
      direction = 'SE';
    }
    if(deg >= 157.5 && deg < 202.5){
      direction = 'S';
    }
    if(deg >= 202.5 && deg < 247.5){
      direction = 'SW';
    }
    if(deg >= 247.5 && deg < 292.5){
      direction = 'W';
    }
    if(deg >= 292.5 && deg < 337.5){
      direction = 'NW';
    }
    return direction;
  }
  __render(){
    if(this._header && this._weatherData){
      this._city.innerHTML = this._weatherData.name;
      this._info.innerHTML = this._weatherData.main.temp;
      this._wind.innerHTML = `Wind: ${this._weatherData.wind.speed} - ${this.__createWindDirection(this._weatherData.wind.deg)}`;
      this._humidity.innerHTML = `Humidity: ${this._weatherData.main.humidity}%`;
      this._pressure.innerHTML = `Pressure: ${this._weatherData.main.pressure}`;
      this._shadowRoot.querySelector('.icon img').src = `images/icons/${this.__createIcon(this._weatherData.weather[0].icon)}.svg`;
    }

  }

}
if(!customElements.get('weather-card')){
  customElements.define('weather-card', weatherCard);
}
