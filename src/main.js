import MenuView from './view/menu.js';
import RouteInformationView from './view/routeInformation.js';
import PriceView from './view/price.js';
import FiltersView from './view/filters.js';
import SortsView from './view/sorts.js';
import EditPointView from './view/editPoint.js';
import PointView from './view/point.js';
import {generatePoint} from './mock/point.js';
import {render, RenderPosition, replace} from './utils/render.js';


const POINT_COUNT = 15;


const points = new Array(POINT_COUNT).fill().map(generatePoint);


const tripHeader = document.querySelector(`.trip-main`);
render(tripHeader, new RouteInformationView(points), RenderPosition.PLACE_IN_BEGIN);


const tripInfo = tripHeader.querySelector(`.trip-info`);
const tripPrice = tripInfo.querySelector(`.trip-info__cost`);
render(tripPrice, new PriceView(points), RenderPosition.PLACE_IN_END);


const tripControls = tripHeader.querySelector(`.trip-controls`);
render(tripControls, new MenuView(), RenderPosition.PLACE_IN_END);
render(tripControls, new FiltersView(), RenderPosition.PLACE_IN_END);


const tripEvents = document.querySelector(`.trip-events`);
const tripList = tripEvents.querySelector(`.trip-events__list`);

render(tripEvents, new SortsView(), RenderPosition.PLACE_IN_BEGIN);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  pointComponent.setClickHandler(() => {
    replacePointToForm();
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
  });

  pointEditComponent.setClickHandler(() => {
    replaceFormToPoint();
  });

  render(pointListElement, pointComponent, RenderPosition.PLACE_IN_END);
};


for (let i = 0; i < POINT_COUNT; i++) {
  renderPoint(tripList, points[i]);
}
