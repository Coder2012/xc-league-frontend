import { domain } from '../helpers/domain';

export const getExport = () => {
  window.location = `${domain}/flights/export`;
}

export const getPilots = () => {
  return fetch(`${domain}/flights/pilots`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  })
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      }))
    )
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    });
};

export const getDates = action => {
  const { startDate, endDate } = action.payload;

  return fetch(`${domain}/flights/dates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      start: startDate,
      end: endDate
    })
  })
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      }))
    )
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    });
};

export const getFlightsByPilot = action => {
  const { pilot, limit, page, responseType = 'full' } = action.payload;

  return fetch(`${domain}/flights/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      pilot: pilot,
      page: page,
      limit: limit,
      responseType: responseType
    })
  })
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      }))
    )
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    });
};

export const getFlightsByDistance = action => {
  const { distance, page, limit, responseType = 'full' } = action.payload;

  return fetch(`${domain}/flights/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      distance: distance,
      page: page,
      limit: limit,
      responseType: responseType
    })
  })
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      }))
    )
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    });
};

export const getFlightsByDate = action => {
  const { date, limit = 10, page = 1, responseType = 'full' } = action.payload;

  return fetch(`${domain}/flights/date`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      date: date,
      page: page,
      limit: limit,
      responseType: responseType
    })
  })
    .then(response =>
      response.json().then(data => ({
        data: data,
        status: response.status
      }))
    )
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(error => {
      // console.log(errors.ERROR_FETCHING_FLIGHTS_BY_DATE);
      // dispatch(fetchError(errors.ERROR_FETCHING_FLIGHTS_BY_DATE));
    });
};
