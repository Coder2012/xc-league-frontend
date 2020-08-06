import React from 'react';
import { useStore } from 'effector-react';
import { flightsService } from '../../services/flights';
import { PilotSearch } from '../../components/PilotSearch';

export const Pilot = () => {
  const { flightData, pages, total } = useStore(flightsService.$flights);
  console.log(flightData?.length);

  const searchHandler = pilot => {
    flightsService.getFlightsByPilot(pilot);
  };
  return (
    <>
      <PilotSearch clickHandler={searchHandler} />
    </>
  );
};
