import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { getDatesCount } from '../helpers/date';

const domain = 'https://xc-league.herokuapp.com';

function* fetchPilots() {
  try {
    console.log('busy again');
    const { pilots } = yield call(() => {
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
      // .catch(error => {
      // console.log(errors.ERROR_FETCHING_PILOTS);
      // dispatch(fetchError(errors.ERROR_FETCHING_PILOTS));
      // });
    });

    yield put({ type: types.RECEIVE_PILOTS, pilots });
  } catch (e) {
    yield put({ type: 'ERROR_FETCHING_PILOTS', message: e.message });
  }
}

function* fetchFlightDates(action) {
  const { startDate, endDate } = action.payload;
  console.log(startDate, endDate);

  try {
    const { dates } = yield call(() => {
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
    });
    console.log('dates:', dates);

    yield put({
      type: types.RECEIVE_FLIGHT_DATES,
      dates: getDatesCount(dates)
    });
  } catch (e) {
    console.log('error');
  }
}

function* fetchFlightsByPilot(action) {
  const { pilot, limit, page, responseType = 'full' } = action.payload;
  console.log(action);
  try {
    const data = yield call(() => {
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
    });

    yield put({
      type: types.RECEIVE_FLIGHTS_BY_PILOT,
      flights: data.flightData.flights,
      pages: data.pages,
      total: data.total
    });
  } catch (e) {
    console.log('failed fetching flights by pilot');
  }
}

function* fetchFlightsByDistance(action) {
  const { distance, page, limit, responseType = 'full' } = action.payload;
  console.log(distance, page, limit);
  try {
    const data = yield call(() => {
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
            console.log('success');
            return response.data;
          }
        });
    });

    console.log(data);

    yield put({
      type: types.RECEIVE_FLIGHTS_BY_DISTANCE,
      flights: data.flightData.flights,
      pages: data.pages,
      total: data.total
    });
  } catch (e) {
    console.log('failed to get flights by distance');
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeEvery('FETCH_PILOTS', fetchPilots);
  yield takeEvery('FETCH_FLIGHT_DATES', fetchFlightDates);
  yield takeEvery('FETCH_FLIGHTS_BY_PILOT', fetchFlightsByPilot);
  yield takeEvery('FETCH_FLIGHTS_BY_DISTANCE', fetchFlightsByDistance);
}

export default mySaga;
