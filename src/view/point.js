import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {createElement} from '../utils.js';

dayjs.extend(duration);

const createItemOfferTemplate = (data = []) => {
  return data.map(({name, isActive, price}) => (
    isActive ?
      `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>`
      : ``
  )).join(` `);
};

const createPointTemplate = (points) => {
  const {type, city, time, price, offers, isFavorite} = points;

  const dateBegin = dayjs(time.begin).format(`D MMM`);
  const dateEnd = dayjs(time.end).format(`D MMM`);
  const beginDateBrowser = dayjs(time.begin).format(`YYYY-MM-DD`);
  const timeBegin = dayjs(time.begin).format(`HH:mm`);
  const timeEnd = dayjs(time.end).format(`HH:mm`);
  const fullBeginDateBrowser = dayjs(time.begin).format(`YYYY-M-DDTHH:mm`);
  const fullEndDateBrowser = dayjs(time.begin).format(`YYYY-M-DDTHH:mm`);

  const firstDate = dayjs.duration({
    days: dayjs(time.end).format(`DD`),
    hours: dayjs(time.end).format(`HH`),
    minutes: dayjs(time.end).format(`mm`),
  });
  const secondDate = dayjs.duration({
    days: dayjs(time.begin).format(`DD`),
    hours: dayjs(time.begin).format(`HH`),
    minutes: dayjs(time.begin).format(`mm`),
  });
  const resultDays = firstDate.subtract(secondDate).days();
  const resultHours = firstDate.subtract(secondDate).hours();
  const resultMinutes = firstDate.subtract(secondDate).minutes();

  const favoriteClassName = isFavorite ? `event__favorite-btn--active` : ``;

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${beginDateBrowser}">${dateBegin}<br>${dateEnd}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${fullBeginDateBrowser}">${timeBegin}</time>
          &mdash;
          <time class="event__end-time" datetime="${fullEndDateBrowser}">${timeEnd}</time>
        </p>
        <p class="event__duration">${resultDays === 0 ? `` : resultDays + `D`} ${resultHours === 0 ? `` : resultHours + `H`} ${resultMinutes === 0 ? `` : resultMinutes + `M`}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createItemOfferTemplate(offers)}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
</li>`;
};

export default class Point {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createPointTemplate(this._points);
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
