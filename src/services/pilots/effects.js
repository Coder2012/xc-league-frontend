import { domain } from '../domain';
import { api } from '../../helpers/urls';

export const getPilots = domain.createEffect('pilots effect', {
  async handler() {
    const res = await fetch(`${api}/flights/pilots`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });
    return res.json();
  },
});
