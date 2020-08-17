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

  return (
    <>
      <DistanceSearch handleClick={id => setDistance(id)} />
      {total && (
        <p className={AppStyles.subtitle}>
          {total} Flights scoring over {distance}
        </p>
      )}
      <FlightDashboard flightData={flightData} pages={pages} />
    </>
  );
};
