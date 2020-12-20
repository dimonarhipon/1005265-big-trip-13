import {createElement} from '../utils.js';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const createPriceTemplate = (points) => {
  const totalPrice = points.map(({price}) => price).reduce(reducer);

  return `<span class="trip-info__cost-value">${totalPrice}</span>`;
};


export default class Price {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createPriceTemplate(this._points);
  }

  getElement() {
    if (!this.element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
