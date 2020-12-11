import dayjs from 'dayjs';

export const createRouteInformationTemplate = (points) => {
  const cities = points.map(({city}, index) => (
    index === 0 ? `${city}` : `— ${city}`
  )).join(` `);

  const times = points.map(({time}) => time);
  const beginDate = dayjs(times[0].begin).format(`MMM DD`);
  const endDate = dayjs(times[times.length - 1].end).format(`MMM DD`);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${cities}</h1>
      <p class="trip-info__dates">${beginDate}&nbsp;&mdash;&nbsp;${endDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;
    </p>
  </section>`;
};
