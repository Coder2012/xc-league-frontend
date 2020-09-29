import React from 'react';
import ReactCalendar from 'react-calendar';
import '../../react-calendar/styles.css';

export const Calendar = ({
  dates,
  dateChangeHandler,
  monthChangeHandler,
  calendarNavigationHandler
}) => {
  const tileContent = ({ date, view }) => {
    const localDate = date.toLocaleDateString().split('/').reverse().join('-');
    let flightCount = dates[localDate];
    console.log(flightCount)

    if (flightCount) {
      return view === 'month' && flightCount ? (
        <span className={`calendar-flights ${getCountClass(flightCount)}`}>
          {date.getDate()}
        </span>
      ) : null;
    }
    return null;
  };

  const getCountClass = count => {
    if (count >= 10 && count <= 50) {
      return 'flight-count-medium';
    } else if (count > 50) {
      return 'flight-count-high';
    }
    return 'flight-count-low';
  };

  const onDateChange = date => {
    const localDate = date.toLocaleDateString().split('/').reverse().join('-');
    if (dates[localDate]) dateChangeHandler(date);
  };

  return (
    <ReactCalendar
      tileClassName="calendar-item"
      tileContent={tileContent}
      minDate={new Date('2005-01-01')}
      maxDate={new Date()}
      onChange={onDateChange}
      onClickMonth={monthChangeHandler}
      onActiveDateChange={calendarNavigationHandler}
    />
  );
};
