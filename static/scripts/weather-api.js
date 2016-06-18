class WeatherApi {

  constructor() {
    this.host ='http://api.openweathermap.org/data/2.5/weather';
    this.key = '';
  }
  getWeather(city){
    const weatherUrl = `${this.host}?q=${city}&appid=${this.key}&units=imperial&lang=en`;
    return Rx.Observable.fromPromise(fetch(weatherUrl))
            .flatMap(function(data){
              console.log(data);
              return Rx.Observable.fromPromise(data.json());
            });;
  }
}
