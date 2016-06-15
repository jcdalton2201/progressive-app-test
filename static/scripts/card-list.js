'use strict';
class CardList extends HTMLElement{
  createdCallback()  {
    this.buildList();
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
