import { domain } from '../domain';
import { reset } from './events';
import { getDates, getFlightsByDate, getFlightsByPilot, getFlightsByDistance } from './effects';
import { getDatesCount } from '../../helpers/date';

export const $dates = domain
  .createStore({ count: 0, dates: [] }, { name: 'dates store' })
  .on(getDates.doneData, (_, { dates }) => ({ dates: getDatesCount(dates) }));

export const $flights = domain
  .createStore([], { name: 'flights store' })
  .on(getFlightsByPilot.doneData, (_, data) => data)
  .on(getFlightsByDate.doneData, (_, data) => data)
  .on(getFlightsByDistance.doneData, (_, data) => data)
  .reset(reset);
