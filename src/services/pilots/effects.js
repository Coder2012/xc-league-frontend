import { domain } from '../domain';

export const getPilots = domain.createEffect('pilots effect', {
  async handler() {
    const res = await fetch(`http://localhost:3000/flights/pilots`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    });
    return res.json();
  }
});
