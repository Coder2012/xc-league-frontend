import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import { flightsService } from '../../services/flights';
import { FlightDashboard } from '../../container/FlightsDashboard';
import Calendar from '../../components/Calendar';

import AppStyles from '../../App.module.css';

export const Dates = () => {
  const [controls, setControls] = useState({});
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [date, setDate] = useState(undefined);
  const { dates } = useStore(flightsService.$dates);
  const { flightData, pages, total } = useStore(flightsService.$flights);

  useEffect(() => {
    monthChangeHandler(new Date());
  }, []);

  useEffect(() => {
    if (date) {
      flightsService.getFlightsByDate({
        date,
        ...controls
      });
    }
  }, [date, controls]);

  useEffect(() => {
    if (startDate && endDate) {
      flightsService.getDates({
        startDate,
        endDate,
        ...controls
      });
    }
    return () => flightsService.reset();
  }, [startDate, endDate, controls]);

  const dateChangeHandler = date => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dt = date.getDate().toString().padStart(2, '0');

    setDate(`${year}-${month}-${dt}`);
  };

  const monthChangeHandler = date => {
    const firstDay = (new Date(date.getFullYear(), date.getMonth(), 1).getDate()).toString().padStart(2, '0');
    const lastDay = (new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()).toString().padStart(2, '0');
    const startMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const finishMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const startYear = date.getFullYear();
    const finishYear = date.getFullYear();

    const startDate = `${startYear}-${startMonth}-${firstDay}`;
    const endDate = `${finishYear}-${finishMonth}-${lastDay}`;

    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <>
      <Calendar
        dates={dates}
        dateChangeHandler={dateChangeHandler}
        monthChangeHandler={monthChangeHandler}
        calendarNavigationHandler={({ activeStartDate }) =>
          monthChangeHandler(activeStartDate)
        }
      />
      {total && (
        <p className={AppStyles.subtitle}>
          {total} Flight{total > 1 ? 's' : ''} on {new Date(date).toDateString()}
        </p>
      )}
      <FlightDashboard
        flightData={flightData}
        pages={pages}
        onControlsUpdate={controls => setControls(controls)}
        resetControls={date}
      />
    </>
  );
};
