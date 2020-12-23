import AbstractView from './abstract.js';

export const createLoadingTemplate = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};


export default class Loading extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
