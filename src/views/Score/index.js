import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';

import { uiService } from '../../services/ui';
import { flightsService } from '../../services/flights';

import { FlightDashboard } from '../../container/FlightsDashboard';
import { DistanceSearch } from '../../components/DistanceSearch';

import AppStyles from '../../App.module.css';

export const Score = () => {
  const [distance, setDistance] = useState();
  const { controls } = useStore(uiService.$);

  const { flightData, pages, total } = useStore(flightsService.$flights);
  const loading = useStore(flightsService.getFlightsByDistance.pending);

  useEffect(() => {
    return () => flightsService.reset();
  }, []);

  useEffect(() => {
    if (distance) {
      flightsService.getFlightsByDistance({
        distance,
        ...controls
      });
    }
  }, [distance, controls]);

  const distanceHandler = id => {
    uiService.resetControls();
    setDistance(id);
  }

  return (
    <>
      <DistanceSearch handleClick={distanceHandler} />
      <p className={AppStyles.subtitle}>
        {loading && 'Loading...'}
        {!loading && total && (
          <>
            {total} Flights scoring over {distance}
          </>
        )}
      </p>
      <FlightDashboard flightData={flightData} pages={pages} />
    </>
  );
};
