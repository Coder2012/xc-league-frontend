export const getDatesCount = data => {
  return data.reduce((itemsArray, item) => {
    if(!itemsArray[item]) itemsArray[item] = { date: item, count: 0 };
    const obj = itemsArray[item];
    obj.count = obj.count + 1;
    return itemsArray;
  }, []).filter(it => it);
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
