(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports}var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{configurable:false,enumerable:true,get:getter})}};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module["default"]}:function getModuleExports(){return module};__webpack_require__.d(getter,"a",getter);return getter};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};__webpack_require__.p="";return __webpack_require__(__webpack_require__.s=0)})([function(module,exports,__webpack_require__){__webpack_require__(1)},function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});var __WEBPACK_IMPORTED_MODULE_0__weather_card_list_js__=__webpack_require__(2);class weatherApp extends HTMLElement{constructor(){super();this._shadowRoot=this.attachShadow({mode:"open"})}connectedCallback(){this._shadowRoot.innerHTML=`<style>.content {\n  display: flex;\n  justify-content: center; }\n</style><div class='content'>\n  <weather-card-list></weather-card-list>\n</div>`}disconnectedCallback(){}attributeChangedCallback(){}adoptedCallback(){}}if(!customElements.get("weather-app")){customElements.define("weather-app",weatherApp)}},function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0__weather_api_js__=__webpack_require__(3);var __WEBPACK_IMPORTED_MODULE_1__weather_card_js__=__webpack_require__(4);var __WEBPACK_IMPORTED_MODULE_1__weather_card_js___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__weather_card_js__);var __WEBPACK_IMPORTED_MODULE_2__weather_button_js__=__webpack_require__(5);var __WEBPACK_IMPORTED_MODULE_2__weather_button_js___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__weather_button_js__);class weatherCardList extends HTMLElement{constructor(){super();this._shadowRoot=this.attachShadow({mode:"open"});this.__weatherApi=new __WEBPACK_IMPORTED_MODULE_0__weather_api_js__["a"];this.cities=["Dallas"]}connectedCallback(){this._shadowRoot.innerHTML=`<style>.add-city {\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly; }\n  .add-city input {\n    font-size: 1rem;\n    line-height: 1.15;\n    margin: 0;\n    overflow: visible;\n    text-transform: none;\n    border: 2px solid #c9ced2;\n    border-radius: 3px;\n    -webkit-box-shadow: none;\n    -moz-box-shadow: none;\n    box-shadow: none;\n    padding: 0.625rem 0.875rem;\n    position: relative;\n    transition: border-color .350s ease;\n    box-shadow: none;\n    -webkit-appearance: none;\n    border: 2px solid #CFCCCF;\n    color: #687680;\n    max-width: 100%;\n    width: calc(100% - 32px);\n    box-sizing: content-box;\n    height: 1.25rem;\n    margin: 5px; }\n</style><div class='add-city'>\n  <input type="text" name="" value="" class='city'><weather-button></weather-button>\n</div>`;this.__city=this._shadowRoot.querySelector(".city");window.localforage.getItem("selectedCities").then(cityList=>{if(cityList){this.cities=cityList}this.cities.map(city=>{this.__renderCity(city)})});this._shadowRoot.querySelector("weather-button").addEventListener("click",this.__addCity.bind(this))}disconnectedCallback(){}attributeChangedCallback(){}adoptedCallback(){}__addCity(){if(this.__city.value.trim()){this.__renderCity(this.__city.value);this.__saveCity(this.__city.value);this.__city.value=""}}__saveCity(city){this.cities.push(city);window.localforage.setItem("selectedCities",this.cities)}__renderCity(city){this.__weatherApi.getWeather(city,true).then(data=>{const card=document.createElement("weather-card");card.weatherData=data;this._shadowRoot.appendChild(card);return card.innerText})}}if(!customElements.get("weather-card-list")){customElements.define("weather-card-list",weatherCardList)}},function(module,__webpack_exports__,__webpack_require__){"use strict";class WeatherApi{constructor(){this.host="https://api.openweathermap.org/data/2.5/weather";this.key="09cb1869de193f4ffe078d9053a7e0ad"}getWeather(city,sync){let flag="";if(sync){flag="&sync=true"}const weatherUrl=`${this.host}?q=${city}&appid=${this.key}&units=imperial&lang=en${flag}`;return fetch(weatherUrl).then(res=>{return res.json()}).then(data=>{return data})}}__webpack_exports__["a"]=WeatherApi},function(module,exports){class weatherCard extends HTMLElement{constructor(){super();this._shadowRoot=this.attachShadow({mode:"open"})}connectedCallback(){this._shadowRoot.innerHTML=`<style>.main {\n  margin: 5px;\n  box-shadow: #eaeaea 2px 2px 2px 2px;\n  max-width: 400px;\n  border: #a2aaaa 1px solid;\n  padding: 5px;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  grid-template-rows: 3rem 5rem 40px;\n  grid-template-areas: "header header header" "temp temp icon" "wind humidity presure"; }\n  .main .header {\n    grid-area: header;\n    font-size: 3rem; }\n  .main .info {\n    font-size: 5rem;\n    grid-area: temp; }\n  .main .icon {\n    grid-area: icon; }\n    .main .icon img {\n      height: 5rem; }\n  .main .wind {\n    grid-area: wind;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n  .main .humidity {\n    grid-area: humidity;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n  .main .pressure {\n    grid-area: presure;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n</style><div class="main">\n  <div class="header">\n    Dallas\n  </div>\n  <div class='info'> Temp : 69.08 F mist</div>\n  <div  class='icon'><img src="images/icons/01d.svg" alt=""/></div>\n  <div class="wind">x</div>\n  <div class="humidity">y</div>\n  <div class="pressure">z</div>\n</div>\n`;this._header=this._shadowRoot.querySelector(".header");this._info=this._shadowRoot.querySelector(".info");this._icon=this._shadowRoot.querySelector(".icon");this._wind=this._shadowRoot.querySelector(".wind");this._humidity=this._shadowRoot.querySelector(".humidity");this._pressure=this._shadowRoot.querySelector(".pressure");this.__render()}disconnectedCallback(){}attributeChangedCallback(){}adoptedCallback(){}get weatherData(){return this._weatherData}set weatherData(data){this._weatherData=data;this.__render()}__createIcon(icon){if(icon==="04d"||icon==="03d"){icon="02d"}return icon.replace("n","d")}__createWindDirection(deg){let direction="N";if(deg>=22.5&&deg<67.5){direction="NE"}if(deg>=67.5&&deg<112.5){direction="E"}if(deg>=112.5&&deg<157.5){direction="SE"}if(deg>=157.5&&deg<202.5){direction="S"}if(deg>=202.5&&deg<247.5){direction="SW"}if(deg>=247.5&&deg<292.5){direction="W"}if(deg>=292.5&&deg<337.5){direction="NW"}return direction}__render(){if(this._header&&this._weatherData){this._header.innerHTML=this._weatherData.name;this._info.innerHTML=this._weatherData.main.temp;this._wind.innerHTML=`Wind: ${this._weatherData.wind.speed} - ${this.__createWindDirection(this._weatherData.wind.deg)}`;this._humidity.innerHTML=`Humidity: ${this._weatherData.main.humidity}%`;this._pressure.innerHTML=`Pressure: ${this._weatherData.main.pressure}`;this._shadowRoot.querySelector(".icon img").src=`images/icons/${this.__createIcon(this._weatherData.weather[0].icon)}.svg`}}}if(!customElements.get("weather-card")){customElements.define("weather-card",weatherCard)}},function(module,exports){class weatherButton extends HTMLElement{constructor(){super();this._shadowRoot=this.attachShadow({mode:"open"})}connectedCallback(){this._shadowRoot.innerHTML=`<style>svg {\n  background-color: #128020;\n  border-radius: 50%;\n  cursor: pointer; }\n  svg:hover {\n    background-color: #3fc848; }\n  svg:active {\n    background-color: #ffdc24; }\n</style><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">\n<style type="text/css">\n\t.st0{fill:#263A48;}\n</style>\n<g >\n\t<g  transform="translate(-384.000000, -193.000000)">\n\t\t<path  class="st0" d="M393.8,209.2h7.8v-0.7h-7.8V209.2z M393.8,206.6h7.8V206h-7.8V206.6z M393.8,204.1h7.8v-0.7h-7.8\n\t\t\tV204.1z M393.8,201.5h7.8v-0.7h-7.8V201.5z M390.9,208.9c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.3,0.8-0.8,0.8\n\t\t\tC391.2,209.6,390.9,209.3,390.9,208.9L390.9,208.9z M390.9,206.3c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8\n\t\t\tc0,0.4-0.3,0.8-0.8,0.8C391.2,207,390.9,206.7,390.9,206.3L390.9,206.3z M390.9,203.7c0-0.4,0.3-0.8,0.8-0.8\n\t\t\tc0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.3,0.8-0.8,0.8C391.2,204.5,390.9,204.2,390.9,203.7L390.9,203.7z M390.9,201.2\n\t\t\tc0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.3,0.8-0.8,0.8C391.2,201.9,390.9,201.6,390.9,201.2L390.9,201.2z"/>\n\t</g>\n</g>\n</svg>\n`;this.style["width"]="54px";this.style["height"]="54px"}disconnectedCallback(){}attributeChangedCallback(){}adoptedCallback(){}}if(!customElements.get("weather-button")){customElements.define("weather-button",weatherButton)}}]);