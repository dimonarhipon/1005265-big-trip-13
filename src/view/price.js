import AbstractView from './abstract.js';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const createPriceTemplate = (points) => {
  const totalPrice = points.map(({price}) => price).reduce(reducer);

  return `<span class="trip-info__cost-value">${totalPrice}</span>`;
};


export default class Price extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createPriceTemplate(this._points);
  }
}
