import { getWeekDays, getDayString } from '../helpers/date';

export const timeData = () => {
  return {
    title: 'Select Time',
    name: 'time',
    id: 'time',
    options: [
      { value: '0700', label: '0700' },
      { value: '0800', label: '0800' },
      { value: '0900', label: '0900' },
      { value: '1000', label: '1000' },
      { value: '1100', label: '1100' },
      { value: '1200', label: '1200' },
      { value: '1300', label: '1300' },
      { value: '1400', label: '1400' },
      { value: '1500', label: '1500' },
      { value: '1600', label: '1600' },
      { value: '1700', label: '1700' },
      { value: '1800', label: '1800' },
      { value: '1900', label: '1900' }
    ]
  };
};

export const locationData = () => {
  return {
    title: 'Select Parameter',
    name: 'location',
    id: 'Param',
    options: [
      { value: '', label: 'Select Sounding' },
      { value: 'sounding1', label: '#1: Exeter' },
      { value: 'sounding2', label: '#2: Fairford' },
      { value: 'sounding3', label: '#3: Herstmonceux' },
      { value: 'sounding4', label: '#4: Newtown (mid-wales)' },
      { value: 'sounding5', label: '#5: Cambridge' },
      { value: 'sounding6', label: '#6: Nottignham' },
      { value: 'sounding7', label: '#7: Cheviots' },
      { value: 'sounding8', label: '#8: Callander' },
      { value: 'sounding9', label: '#9: Aboyne' },
      { value: 'sounding10', label: '#10: Buckingham' },
      { value: 'sounding11', label: '#11: Larkhill' },
      { value: 'sounding12', label: '#12: Leeds' },
      { value: 'sounding13', label: '#13: Carrickmore-NI' },
      { value: 'sounding14', label: '#14: Castor Bay-NI' },
      { value: 'sounding15', label: '#15: Talgarth' },
      { value: 'sounding16', label: '#16: Camphill' }
    ]
  };
};

export const dayData = () => {
  const date = new Date();
  const today = getDayString(date, 'gb-en');
  const weekdays = getWeekDays(date, 'gb-en');

  let options = [];
  for (let day of weekdays) {
    let value = day === today ? 'UK4' : day;
    options.push({ value, label: day });
  }

  return {
    title: 'Select Day',
    name: 'day',
    id: 'Day',
    options
  };
};
