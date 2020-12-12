const reducer = (accumulator, currentValue) => accumulator + currentValue;
export const createPriceTemplate = (points) => {
  const totalPrice = points.map(({price}) => price).reduce(reducer);

  return `<span class="trip-info__cost-value">${totalPrice}</span>`;
};
