import {createMenuTemplate} from './view/menu.js';
import {createRouteInformationTemplate} from './view/routeInformation.js';
import {createPriceTemplate} from './view/price.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortsTemplate} from './view/sorts.js';
import {createEditPointTemplate} from './view/editPoint.js';
import {createPointTemplate} from './view/point.js';


const ROUTE_COUNT = 3;
const PLACE_IN_BEGIN = `afterbegin`;
const PLACE_IN_END = `beforeend`;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const tripHeader = document.querySelector(`.trip-main`);
render(tripHeader, createRouteInformationTemplate(), PLACE_IN_BEGIN);


const tripInfo = tripHeader.querySelector(`.trip-info`);
const tripPrice = tripInfo.querySelector(`.trip-info__cost`);
render(tripPrice, createPriceTemplate(), PLACE_IN_END);


const tripControls = tripHeader.querySelector(`.trip-controls`);
render(tripControls, createMenuTemplate(), PLACE_IN_END);
render(tripControls, createFiltersTemplate(), PLACE_IN_END);


const tripEvents = document.querySelector(`.trip-events`);
const tripList = tripEvents.querySelector(`.trip-events__list`);

render(tripEvents, createSortsTemplate(), PLACE_IN_BEGIN);
render(tripList, createEditPointTemplate(), PLACE_IN_END);

for (let i = 0; i < ROUTE_COUNT; i++) {
  render(tripList, createPointTemplate(), PLACE_IN_END);
}

