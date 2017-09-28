export class WeatherApi {
  constructor() {
    // this.host ='/data/2.5/weather';
    this.host ='http://api.openweathermap.org/data/2.5/weather';
    this.key = '09cb1869de193f4ffe078d9053a7e0ad';
  }
  getWeather(city,sync){
    let flag = '';
    if(sync){
      flag = '&sync=true';
    }
    const weatherUrl = `${this.host}?q=${city}&appid=${this.key}&units=imperial&lang=en${flag}`;
    return fetch(weatherUrl)
    .then((res) =>{
      return res.json();
    })
    .then((data) =>{
      return data;
    });

  }
}