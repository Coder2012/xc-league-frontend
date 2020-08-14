import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import { flightsService } from '../../services/flights';
import { FlightDashboard } from '../../container/FlightsDashboard';
import { DistanceSearch } from '../../components/DistanceSearch';

import AppStyles from '../../App.module.css';

export const Score = () => {
  const [distance, setDistance] = useState();
  const [controls, setControls] = useState({});

  const { flightData, pages, total } = useStore(flightsService.$flights);

  useEffect(() => {
    if (distance) {
      console.log('distance', distance);
      flightsService.getFlightsByDistance({
        distance,
        ...controls
      });
    }
    return () => flightsService.reset();
  }, [distance, controls]);

  const distanceSearchHandler = value => {
    setDistance(value);
  };

  return (
    <>
      <DistanceSearch
        handleClick={id => distanceSearchHandler(id)}
      />
      {total && (
        <p className={AppStyles.subtitle}>
          {total} Flights scoring over {distance}
        </p>
      )}
      <FlightDashboard
        flightData={flightData}
        pages={pages}
        onControlsUpdate={controls => setControls(controls)}
        resetControls={distance}
      />
    </>
  );
};
