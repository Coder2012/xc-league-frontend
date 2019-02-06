export const getDatesCount = data => {
  let dataReduced = data.reduce((itemsArray, item) => {
    itemsArray[item] = {
      date: item,
      count:
        (itemsArray[item] && itemsArray[item].count
          ? itemsArray[item].count
          : 0) + 1
    };
    return itemsArray;
  }, []);

  return Object.keys(dataReduced).map(item => dataReduced[item]);
};

export const getWeekDays = (baseDate, locale) => {
  const weekDays = [];
  for (let i = 1; i < 7; i++) {
    weekDays.push(getDayString(baseDate, locale));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
};

export const getDayString = (baseDate, locale) =>
  baseDate.toLocaleDateString(locale, { weekday: 'long' });
