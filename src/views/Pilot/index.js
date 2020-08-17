import React, { useState, useEffect } from 'react';
import { useStore } from 'effector-react';

import { uiService } from '../../services/ui';
import { flightsService } from '../../services/flights';

import { PilotSearch } from '../../components/PilotSearch';
import { FlightDashboard } from '../../container/FlightsDashboard';

import AppStyles from '../../App.module.css';

export const Pilot = () => {
  const [pilot, setPilot] = useState('');
  const { controls } = useStore(uiService.$);

  const { flightData, pages, total } = useStore(flightsService.$flights);
  const loading = useStore(flightsService.getFlightsByPilot.pending);

  useEffect(() => {
    return () => flightsService.reset();
  }, []);

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
      <p className={AppStyles.subtitle}>
        {loading && 'Loading...'}
        {!loading && total && (
          <>
            {total} Flight{total > 1 ? 's' : ''} by {pilot}
          </>
        )}
      </p>
      <FlightDashboard
        flightData={flightData}
        pages={pages}
      />
    </>
  );
};
