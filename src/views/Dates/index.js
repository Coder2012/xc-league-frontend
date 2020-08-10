import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import { flightsService } from '../../services/flights';
import { FlightDashboard } from '../../container/FlightsDashboard';
import Calendar from '../../components/Calendar';

export const Dates = () => {
  const [controls, setControls] = useState({});
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [date, setDate] = useState(undefined);
  const { dates } = useStore(flightsService.$dates);
  const { flightData, pages } = useStore(flightsService.$flights);

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
  }, [startDate, endDate]);

  const dateChangeHandler = date => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    setDate(`${year}-${month}-${dt}`);

    // this.resetState(() => {
    //   this.setState(
    //     {
    //       date: year + '-' + month + '-' + dt
    //     },
    //     () => {
    //       this.fetchFlightsByDate();
    //     }
    //   );
    // });
  };

  const monthChangeHandler = date => {
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    let lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    let startMonth = date.getMonth() + 1;
    let finishMonth = date.getMonth() + 1;
    let startYear = date.getFullYear();
    let finishYear = date.getFullYear();

    if (firstDay < 10) {
      firstDay = '0' + firstDay;
    }

    if (startMonth < 10) {
      startMonth = '0' + startMonth;
    }

    if (finishMonth < 10) {
      finishMonth = '0' + finishMonth;
    }

    let startDate = `${startYear}-${startMonth}-${firstDay}`;
    let endDate = `${finishYear}-${finishMonth}-${lastDay}`;

    setStartDate(startDate);
    setEndDate(endDate);

    // this.resetState(() => {
    //   this.props.dispatch({
    //     type: types.FETCH_FLIGHT_DATES,
    //     payload: { startDate, endDate }
    //   });
    // });
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
      <FlightDashboard
        flightData={flightData}
        pages={pages}
        onControlsUpdate={controls => setControls(controls)}
        resetControls={date}
      />
    </>
  );
};
