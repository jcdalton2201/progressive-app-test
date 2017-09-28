
describe('Test of App', ()=>{
  it('Test we can test', ()=>{
    let App = document.createElement('div');
    App.innerHTML = '<weather-app>We have a tooltip now.</weather-app>';
    document.body.appendChild(App);
    let topApp = document.querySelector('weather-app');
  });

});
