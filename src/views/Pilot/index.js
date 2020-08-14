import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import { flightsService } from '../../services/flights';

import { PilotSearch } from '../../components/PilotSearch';
import { FlightDashboard } from '../../container/FlightsDashboard';

import AppStyles from '../../App.module.css';

export const Pilot = () => {
  const [pilot, setPilot] = useState('');
  const [controls, setControls] = useState({});

  const { flightData, pages, total } = useStore(flightsService.$flights);

  useEffect(() => {
    if (pilot !== '') {
      flightsService.getFlightsByPilot({
        pilot,
        ...controls
      });
    }
    return () => flightsService.reset();
  }, [pilot, controls]);

  return (
    <>
      <PilotSearch clickHandler={pilot => setPilot(pilot)} />
      {total && (
        <p className={AppStyles.subtitle}>
          {total} Flight{total > 1 ? 's' : ''} by {pilot}
        </p>
      )}
      <FlightDashboard
        flightData={flightData}
        pages={pages}
        onControlsUpdate={controls => setControls(controls)}
        resetControls={pilot}
      />
    </>
  );
};
