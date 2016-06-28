'use strict';
class WeatherApi {

  constructor() {
    this.host ='/data/2.5/weather';
    // this.host ='https://api.openweathermap.org/data/2.5/weather';
    this.key = '09cb1869de193f4ffe078d9053a7e0ad';
  }
  getWeather(city){
    const weatherUrl = `${this.host}?q=${city}&appid=${this.key}&units=imperial&lang=en`;
    return Rx.Observable.fromPromise(fetch(weatherUrl))
            .flatMap(function(data){
              return Rx.Observable.fromPromise(data.json());
            });;
  }
}
