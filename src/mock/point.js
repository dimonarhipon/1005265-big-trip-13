import {getRandomInteger} from '../utils.js';
import {IMAGE_CAP, MAX_NUMBER_IMAGE, TYPES, CITIES, TEXT} from '../const.js';


const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);
  return CITIES[randomIndex];
};

const generateOffers = () => {
  const OFFERS = [
    {
      name: `Add luggage`,
      isActive: Boolean(getRandomInteger(0, 1)),
      price: 50,
    },
    {
      name: `Switch to comfort`,
      isActive: Boolean(getRandomInteger(0, 1)),
      price: 80,
    },
    {
      name: `Add meal`,
      isActive: Boolean(getRandomInteger(0, 1)),
      price: 15,
    },
    {
      name: `Choose seats`,
      isActive: Boolean(getRandomInteger(0, 1)),
      price: 5,
    },
    {
      name: `Travel by train`,
      isActive: Boolean(getRandomInteger(0, 1)),
      price: 40,
    },
  ];
  return OFFERS;
};

const generateDescription = () => {
  const randomCount = getRandomInteger(1, getRandomInteger(0, TEXT.length - 1));

  let description = ``;
  for (let i = 0; i < randomCount; i++) {
    description += TEXT[i];
  }
  return description;
};

const generatePhoto = () => {
  const randomIndex = getRandomInteger(0, MAX_NUMBER_IMAGE);
  return IMAGE_CAP + randomIndex;
};

export const generatePoint = () => {
  return {
    type: generateType(),
    destination: generateDestination(),
    offers: generateOffers(),
    locationInformation: {
      description: generateDescription(),
      photo: generatePhoto(),
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
