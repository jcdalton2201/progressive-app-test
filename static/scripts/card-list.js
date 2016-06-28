'use strict';
class CardList extends HTMLElement{
  createdCallback()  {
    this.cities = ['London,uk','Dallas','Rome,it','Chicago','Munich'];
    this.fetchWeather();
    Rx.Observable.fromEvent(document,'backgroundSync').subscribe((evt)=>{
      this.fetchWeather(true);
    });
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
  fetchWeather(sync){
    const weather = new WeatherApi();
    Rx.Observable.from(this.cities).subscribe((city) =>{
      const weatherSub = weather.getWeather(city,sync);
      weatherSub.subscribe(
        (data)=> {
          this.buildCard(data);
        },
        (error)=> {
          console.error(error);
        },
        ()=> {
        });
    });
  }
  buildCard(weather){
    if(weather.weather[0].icon === '04d') {
      weather.weather[0].icon = '02d';
    }
    let icon = `images/icons/${weather.weather[0].icon}.svg`
    let item = `<ui-card data='fine'>
      <div>
        <div class='header'>
          <div>${weather.name}</div>
        </div>
        <div class='body'>
          <div class='img'><img src='${icon}'></div>
          <div class='desBody'>
           <div class='descriptionDiv'>${weather.weather[0].description}</div>
           <div  class='descriptionDiv'>Temp : ${weather.main.temp} F</div>
           <div  class='descriptionDiv'>${weather.main.temp_max} - ${weather.main.temp_min}</div>
          </div>
        </div>
      </div>
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
