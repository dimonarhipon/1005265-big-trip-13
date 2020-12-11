import dayjs from 'dayjs';
import {getRandomInteger} from '../utils.js';
const MAX_MINUTE_GAP = 59;
import {IMAGE_CAP, MAX_NUMBER_IMAGE, MIN_PRICE, MAX_PRICE, MIN_DAYS_GAP, MAX_DAYS_GAP_1, MAX_DAYS_GAP_2, MAX_HOUR_GAP, TYPES, CITIES, TEXT, OFFERS} from '../const.js';


const generateDate = (minDaysGap, maxDaysGap, maxHoursGap, maxMinuteGap) => {
  if (maxDaysGap > 3) {
    minDaysGap = MAX_DAYS_GAP_1;
  }

  const daysGap = getRandomInteger(minDaysGap, maxDaysGap);
  const timeGap = getRandomInteger(0, maxHoursGap);
  const minuteGap = getRandomInteger(0, maxMinuteGap);

  const day = dayjs().add(daysGap, `day`).add(timeGap, `hour`).add(minuteGap, `minutes`).toDate();
  return day;
};


const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const generateCities = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);
  return CITIES[randomIndex];
};

const generateOffers = () => {
  return OFFERS.map(({name, price}) => (
    {
      name,
      isActive: Boolean(getRandomInteger(0, 1)),
      price
    }
  ));
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
    city: generateCities(),
    time: {
      begin: generateDate(MIN_DAYS_GAP, MAX_DAYS_GAP_1, MAX_HOUR_GAP, MAX_MINUTE_GAP),
      end: generateDate(MIN_DAYS_GAP, MAX_DAYS_GAP_2, MAX_HOUR_GAP, MAX_MINUTE_GAP)
    },
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    offers: generateOffers(),
    locationInformation: {
      description: generateDescription(),
      photo: generatePhoto(),
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
