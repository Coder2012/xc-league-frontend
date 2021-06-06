import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';

import { uiService } from '../../services/ui';
import { flightsService } from '../../services/flights';

import { FlightDashboard } from '../../container/FlightDashboard';
import { Calendar } from '../../components/Calendar';

import AppStyles from '../../app.module.scss';

export const Dates = () => {
  const { controls } = useStore(uiService.$);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [date, setDate] = useState(undefined);
  const { dates } = useStore(flightsService.$dates);

  const { flightData, pages, total } = useStore(flightsService.$flights);
  const loading = useStore(flightsService.getFlightsByDate.pending);

  useEffect(() => {
    monthChangeHandler(new Date());
    return () => flightsService.reset();
  }, []);

  useEffect(() => {
    if (date) {
      uiService.resetControls();
      flightsService.getFlightsByDate({
        date,
        ...controls,
      });
    }
  }, [date, controls]);

  useEffect(() => {
    if (startDate && endDate) {
      flightsService.getDates({
        startDate,
        endDate,
        ...controls,
      });
    }
  }, [startDate, endDate, controls]);

  const dateChangeHandler = date => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dt = date.getDate().toString().padStart(2, '0');

    setDate(`${year}-${month}-${dt}`);
  };

  const monthChangeHandler = date => {
    flightsService.resetDates();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
      .getDate()
      .toString()
      .padStart(2, '0');
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      .getDate()
      .toString()
      .padStart(2, '0');
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
      <p className={AppStyles.subtitle}>
        {loading && 'Loading...'}
        {!loading && total && (
          <>
            {total} Flight{total > 1 ? 's' : ''} on{' '}
            {new Date(date).toDateString()}
          </>
        )}
      </p>
      <FlightDashboard flightData={flightData} pages={pages} />
    </>
  );
};
