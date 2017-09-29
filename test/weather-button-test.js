
describe('Test of Button', ()=>{
  it('Test we can test', ()=>{
    let Button = document.createElement('div');
    Button.innerHTML = '<weather-button>We have a tooltip now.</weather-button>';
    document.body.appendChild(Button);
    let topButton = document.querySelector('weather-button');
  });

});
