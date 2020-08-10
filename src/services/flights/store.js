import { domain } from '../domain';
import { getDates, getFlightsByDate, getFlightsByPilot } from './effects';
import { getDatesCount } from '../../helpers/date';

export const $dates = domain
  .createStore({ count: 0, dates: [] }, { name: 'dates store' })
  .on(getDates.doneData, (_, { dates }) => ({ dates: getDatesCount(dates) }));

export const $flights = domain
  .createStore([], { name: 'flights store' })
  .on(getFlightsByPilot.doneData, (_, data) => data)
  .on(getFlightsByDate.doneData, (_, data) => data);
