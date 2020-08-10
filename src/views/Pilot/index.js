import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import { flightsService } from '../../services/flights';

import { PilotSearch } from '../../components/PilotSearch';
import { FlightDashboard } from '../../container/FlightsDashboard';

export const Pilot = () => {
  const [pilot, setPilot] = useState('');
  const [controls, setControls] = useState({});

  const { flightData, pages } = useStore(flightsService.$flights);

  useEffect(() => {
    if (pilot !== '') {
      flightsService.getFlightsByPilot({
        pilot,
        ...controls
      });
    }
  }, [pilot, controls]);

  return (
    <>
      <PilotSearch clickHandler={pilot => setPilot(pilot)} />
      <FlightDashboard
        flightData={flightData}
        pages={pages}
        onControlsUpdate={controls => setControls(controls)}
        resetControls={pilot}
      />
    </>
  );
};
