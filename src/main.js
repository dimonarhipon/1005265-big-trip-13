import MenuView from './view/menu.js';
import RouteInformationView from './view/routeInformation.js';
import PriceView from './view/price.js';
import FiltersView from './view/filters.js';
import SortsView from './view/sorts.js';
import EditPointView from './view/editPoint.js';
import PointView from './view/point.js';
import {generatePoint} from './mock/point.js';
import {render, RenderPosition} from './utils.js';


const POINT_COUNT = 15;


const points = new Array(POINT_COUNT).fill().map(generatePoint);


const tripHeader = document.querySelector(`.trip-main`);
render(tripHeader, new RouteInformationView(points).getElement(), RenderPosition.PLACE_IN_BEGIN);


const tripInfo = tripHeader.querySelector(`.trip-info`);
const tripPrice = tripInfo.querySelector(`.trip-info__cost`);
render(tripPrice, new PriceView(points).getElement(), RenderPosition.PLACE_IN_END);


const tripControls = tripHeader.querySelector(`.trip-controls`);
render(tripControls, new MenuView().getElement(), RenderPosition.PLACE_IN_END);
render(tripControls, new FiltersView().getElement(), RenderPosition.PLACE_IN_END);


const tripEvents = document.querySelector(`.trip-events`);
const tripList = tripEvents.querySelector(`.trip-events__list`);

render(tripEvents, new SortsView().getElement(), RenderPosition.PLACE_IN_BEGIN);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
  });

  pointEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  render(pointListElement, pointComponent.getElement(), RenderPosition.PLACE_IN_END);
};


for (let i = 0; i < POINT_COUNT; i++) {
  renderPoint(tripList, points[i]);
}
