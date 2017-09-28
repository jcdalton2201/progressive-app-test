
describe('Test of Card', ()=>{
  it('Test we can test', ()=>{
    let Card = document.createElement('div');
    Card.innerHTML = '<weather-card>We have a tooltip now.</weather-card>';
    document.body.appendChild(Card);
    let topCard = document.querySelector('weather-card');
  });

});
