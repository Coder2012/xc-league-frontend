export const getDatesCount = data =>
  data.reduce((acc, item) => {
    const [date] = item.split('T')
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

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
