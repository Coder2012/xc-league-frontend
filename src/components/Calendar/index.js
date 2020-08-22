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
    let flightCount = dateExists(date.getMonth(), date.getDate());

    if (flightCount) {
      return view === 'month' && flightCount ? (
        <span className={`calendar-flights ${getCountClass(flightCount)}`}>
          {date.getDate()}
        </span>
      ) : null;
    }
    return null;
  };

  const dateExists = (calendarMonth, calendarDate) => {
    let datesCount = 0;

    dates.some(({ date, count }) => {
      let flightDate = new Date(date);
      if (
        calendarMonth === flightDate.getMonth() &&
        calendarDate === flightDate.getDate()
      ) {
        datesCount = count;
      }
      return datesCount;
    });

    return datesCount;
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
    const flightCount = dateExists(date.getMonth(), date.getDate());
    if (flightCount) dateChangeHandler(date);
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
