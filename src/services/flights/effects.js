import { domain } from '../domain';

export const getDates = domain.createEffect('dates effect', {
  async handler({ startDate, endDate }) {
    const res = await fetch(`http://localhost:3000/flights/dates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        start: startDate,
        end: endDate
      })
    });
    return res.json();
  }
});

export const getFlightsByDate = domain.createEffect('flightsByDate effect', {
  async handler({ date, limit = 12, page = 1, responseType = 'full' }) {
    const res = await fetch(`http://localhost:3000/flights/date`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        date,
        page,
        limit,
        responseType
      })
    });
    return res.json();
  }
});

export const getFlightsByDistance = domain.createEffect(
  'flightsByDistance effect',
  {
    async handler({ distance, page, limit, responseType = 'full' }) {
      const res = await fetch(`http://localhost:3000/flights/all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          distance,
          page,
          limit,
          responseType
        })
      });
      return res.json();
    }
  }
);

export const getFlightsByPilot = domain.createEffect(
  'flightsByPilot effect',
  {
    async handler({ pilot, page = 1, limit = 12, responseType = 'full' }) {
      const res = await fetch(`http://localhost:3000/flights/all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          pilot,
          page,
          limit,
          responseType
        })
      });
      return res.json();
    }
  }
);

export const getExport = () => {
  window.location = `${domain}/flights/export`;
}
