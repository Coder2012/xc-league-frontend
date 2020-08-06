import { domain } from '../domain';
import { getPilots } from './effects';

export const $pilots = domain
  .createStore([], { name: 'pilots store' })
  .on(getPilots.doneData, (_, { pilots }) => pilots);
