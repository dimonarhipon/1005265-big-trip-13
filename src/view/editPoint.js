import dayjs from 'dayjs';
import {MAX_PRICE, OFFERS, TYPES, CITIES} from '../const.js';
import {createElement} from '../utils.js';

const createEventOffers = (array) => {
  return array.map(({name, isActive, price}) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${name}" type="checkbox" name="event-offer-comfort" ${isActive ? `checked` : ` `}>
      <label class="event__offer-label" for="event-offer-comfort-${name}">
        <span class="event__offer-title">${name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  )).join(` `);
};

const createEventTypeItems = (array) => {
  return array.map((type) => (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
    </div>`
  ));
};

const createDestinationLists = (array) => {
  return array.map((city) => (
    `<option value="${city}">${city}</option>`
  ));
};

const createEditPointTemplate = (point = {}) => {
  const {
    type = `Taxi`,
    city = `Amsterdam`,
    time = {
      begin: dayjs().add(0, `day`).add(4, `hour`).add(40, `minutes`).toDate(),
      end: dayjs().add(1, `day`).add(5, `hour`).add(50, `minutes`).toDate()
    },
    price = MAX_PRICE,
    offers = OFFERS,
    locationInformation = {
      description: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
      Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
      photo: `http://picsum.photos/248/152?r=1`,
    },
  } = point;

  const dateBegin = dayjs(time.begin).format(`DD/MM/YY HH:mm`);
  const dateEnd = dayjs(time.end).format(`DD/MM/YY HH:mm`);


  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEventTypeItems(TYPES)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationLists(CITIES)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateBegin}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createEventOffers(offers)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${locationInformation.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              <img class="event__photo" src="${locationInformation.photo}" alt="Event photo">
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditPoint {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createEditPointTemplate(this._points);
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
