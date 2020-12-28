import { combine } from 'effector';
import { domain } from '../domain';
import { setControls, resetControls, reset } from './events';

export const initial = {
  page: 1,
  limit: 12,
  limitId: 0,
  responseType: 'full',
};

const $controls = domain
  .createStore(initial, { name: 'uiStore' })
  .on(setControls, (state, controls) => ({
    ...state,
    ...controls,
  }))
  .reset([resetControls, reset]);

export const $ui = combine({ controls: $controls });
