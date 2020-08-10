import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import Limit from '../../components/Limit';
import ViewType from '../../components/ViewType';
import { Flights } from '../../components/Flights';

const initialControls = {
  page: 1,
  limit: 12,
  limitId: 0,
  responseType: 'full'
};

export const FlightDashboard = ({
  flightData,
  pages,
  onControlsUpdate,
  resetControls
}) => {
  const [controls, setControls] = useState(initialControls);

  useEffect(() => {
    onControlsUpdate(controls);
  }, [controls]);

  useEffect(() => {
    setControls(initialControls);
  }, [resetControls]);

  const limitHandler = (limit, index) => {
    setControls(state => ({ ...state, limit, limitId: index, page: 1 }));
  };

  const paginationHandler = operator => {
    const page =
      operator === 'increment'
        ? Math.min(controls.page + 1, pages)
        : Math.max(controls.page - 1, 1);

    setControls(state => ({ ...state, page }));
  };

  const responseTypeHandler = () => {};

  return (
    <>
      <Limit selectedId={controls.limitId} handler={limitHandler} />
      <ViewType handler={responseTypeHandler} />
      <Pagination
        page={controls.page}
        pages={pages}
        paginationHandler={paginationHandler}
      />
      <Flights results={flightData} />
    </>
  );
};
