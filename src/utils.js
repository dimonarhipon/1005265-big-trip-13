
export const RenderPosition = {
  PLACE_IN_BEGIN: `afterbegin`,
  PLACE_IN_END: `beforeend`
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.PLACE_IN_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.PLACE_IN_END:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

