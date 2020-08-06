import { domain } from '../domain';
import { getDates, getFlightsByDate, getFlightsByPilot } from './effects';

export const $dates = domain
  .createStore([], {name: 'dates store'})
  .on(getDates.doneData, (_, dates) => dates)

export const $flights = domain
  .createStore([], {name: 'flights store'})
  .on(getFlightsByPilot.doneData, (_, data) => data)
  .on(getFlightsByDate.doneData, (_, data) => data);
