import '../.temp/weather-button.js';
describe('Test of Button', ()=>{
  let topButton;
  beforeEach(()=>{
    let Button = document.createElement('div');
    Button.innerHTML = '<weather-button>We have a tooltip now.</weather-button>';
    document.body.appendChild(Button);
    topButton = document.querySelector('weather-button');
  });
  it('Test we can test', ()=>{
    expect(topButton.style['width']).toEqual('54px');
  });
  afterEach(()=>{
    document.body.innerHTML = '';
  });

});
