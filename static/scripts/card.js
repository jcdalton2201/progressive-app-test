'use strict';
class Card extends HTMLElement {
  onMove(e) {
    if (!this.target)
      return;
    this.currentX = e.pageX || e.touches[0].pageX;
  }
  onEnd(e) {
    if (!this.target)
      return;

    this.targetX = 0;
    let screenX = this.currentX - this.startX;
    const threshold = this.targetBCR.width * 0.35;
    if (Math.abs(screenX) > threshold) {
      this.targetX = (screenX > 0) ?
           this.targetBCR.width :
          -this.targetBCR.width;
    }

    this.draggingCard = false;
  }
  onStart(e) {
    if(this.target) {
      return;
    }
    if(e.target.tagName !== 'UI-CARD'){
      this.target = e.target.parentElement;
    } else {
      this.target = e.target;
    }
    this.targetBCR = this.target.getBoundingClientRect();

    this.startX = e.pageX || e.touches[0].pageX;
    this.currentX = this.startX;

    this.draggingCard = true;
    this.target.style.willChange = 'transform';

    e.preventDefault();
  }
  update () {

    requestAnimationFrame(this.update);

    if (!this.target)
      return;

    if (this.draggingCard) {
      this.screenX = this.currentX - this.startX;
    } else {
      this.screenX += (this.targetX - this.screenX) / 4;
    }

    const normalizedDragDistance =
        (Math.abs(this.screenX) / this.targetBCR.width);
    const opacity = 1 - Math.pow(normalizedDragDistance, 3);

    this.target.style.transform = `translateX(${this.screenX}px)`;
    this.target.style.opacity = opacity;

    // User has finished dragging.
    if (this.draggingCard)
      return;

    const isNearlyAtStart = (Math.abs(this.screenX) < 0.1);
    const isNearlyInvisible = (opacity < 0.01);

    // If the card is nearly gone.
    if (isNearlyInvisible) {

      // Bail if there's no target or it's not attached to a parent anymore.
      if (!this.target || !this.target.parentNode)
        return;

      const event = new CustomEvent('removeCard', {
        detail: {
          card: this.target,
          nextCard: this.target.nextElementSibling,
          height: this.targetBCR
        }
      })
      this.target.parentNode.removeChild(this.target);
      document.dispatchEvent(event);
    } else if (isNearlyAtStart) {
      this.resetTarget();
    }
  }

  resetTarget () {
    if (!this.target)
      return;

    this.target.style.willChange = 'initial';
    this.target.style.transform = 'none';
    this.target = null;
  }
  createdCallback ()  {
    console.log('Create the element');
    //parmas
    this.targetBCR = null;
    this.target = null;
    this.startX = 0;
    this.currentX = 0;
    this.screenX = 0;
    this.targetX = 0;
    this.draggingCard = false;
    this.update = this.update.bind(this);
    //down
    const ts = Rx.Observable.fromEvent(this, 'touchstart');
    const md = Rx.Observable.fromEvent(this, 'mousedown');
    this.downMerge = Rx.Observable.merge(ts,md);
    this.downMerge.subscribe(this.onStart.bind(this));
    //move
    const tm = Rx.Observable.fromEvent(this, 'touchmove');
    const mm = Rx.Observable.fromEvent(this, 'mousemove');
    this.moveMerge = Rx.Observable.merge(tm,mm);
    this.moveMerge.subscribe(this.onMove.bind(this));
    //end
    const te = Rx.Observable.fromEvent(this, 'touchend');
    const mu = Rx.Observable.fromEvent(this, 'mouseup');
    this.endMerge = Rx.Observable.merge(te,mu);
    this.endMerge.subscribe(this.onEnd.bind(this));
    requestAnimationFrame(this.update);
  }
}
document.registerElement('ui-card', Card);
