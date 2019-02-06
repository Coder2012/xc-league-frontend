import React from 'react';

const Day = props => {
  const { value, today, days, onChange } = props;
  const defaultId = 'UK4';
  let key;

  const getOptions = days => {
    return days.map(day => {
      console.log(today);
      key = (today === day) ? defaultId : day;
      
      return (
        <option key={key} value={key}>
          {day}
        </option>
      );
    });
  };

  return (
    <select name="day" title="Select Day" id="Day" value={value} onChange={onChange}>
      {getOptions(days)}
    </select>
  );
};

export default Day;
