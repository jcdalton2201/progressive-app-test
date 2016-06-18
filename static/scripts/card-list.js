'use strict';
class CardList extends HTMLElement{
  createdCallback()  {
    this.cities = ['London,uk','Dallas','Rome,it','Chicago','Munich','st joseph,mo,usa'];
    this.fetchWeather();
    // this.buildList();
    const removeCard = Rx.Observable.fromEvent(document, 'removeCard');
    removeCard.subscribe((evt) =>{
      let nextItem = false;
      const arry = [...this.children]
      const anim = arry
        .filter((child) => {
          if(child === evt.detail.nextCard){
            nextItem = true;
          }
          return nextItem;
        })
        .map((child)=>{
          child.style.transform = `translateY(${evt.detail.height.height + 20}px)`;
          const trEnd = Rx.Observable.fromEvent(child,'transitionend');
          trEnd.subscribe(
            (evt)=>{
              const card = evt.target;
              card.style.transition = '';
              card.style.transform = '';
            },
            (error)=>{},
            ()=> {

            })
          return child;
        });
      requestAnimationFrame(_ => {
        anim.map((card) => {
          card.style.transition = 'transform 150ms cubic-bezier(0,0,0.31,1)';
          card.style.transform = '';
        })
      });
    });
  }
  fetchWeather(){
    const weather = new WeatherApi();
    Rx.Observable.from(this.cities).subscribe((city) =>{
      const weatherSub = weather.getWeather(city);
      weatherSub.subscribe(
        (data)=> {
          console.log(data);
          this.buildCard(data);
        },
        (error)=> {
          console.log(error);
        },
        ()=> {
          console.log('done');
        });
    });
  }
  buildCard(weather){
    let icon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    let item = `<ui-card data='fine'>
      <h1>${weather.name} <img src='${icon}'></h1>
      <div>
        <div>
        <div>
        ${weather.weather[0].description}
        </div>
          <div>Temp : ${weather.main.temp} F</div>
          <div>High : ${weather.main.temp_max} F</div>
          <div>Low : ${weather.main.temp_min} F</div>
        </div>
        <div>

        </div>
      <div>
    </ui-card>`;
    this.innerHTML =  this.innerHTML + item;
  }
  buildList() {
    let listHtml = '';
    for (var i = 0; i < 11; i++) {
      let item = `<ui-card data='fine'>
        <h1>card ${i}</h1>
      </ui-card>`
      listHtml = listHtml.concat(item);
    }
    this.innerHTML = listHtml;
  }
}
document.registerElement('card-list', CardList);
