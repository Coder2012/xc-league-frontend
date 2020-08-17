import {
  getDates,
  getFlightsByPilot,
  getFlightsByDate,
  getFlightsByDistance
} from './effects';
import { reset, resetDates } from './events';
import { $dates, $flights } from './store';

export const flightsService = {
  $dates,
  $flights,
  getDates,
  getFlightsByPilot,
  getFlightsByDate,
  getFlightsByDistance,
  reset,
  resetDates
};
