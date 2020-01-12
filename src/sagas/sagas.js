import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { getDatesCount } from '../helpers/date';
import * as API from '../data/API';
import * as errors from '../data/constants';

function* fetchPilots() {
  try {
    const { pilots } = yield call(API.getPilots);

    yield put({ type: types.RECEIVE_PILOTS, pilots });
  } catch (e) {
    yield put({ type: types.ERROR, message: errors.ERROR_FETCHING_PILOTS });
  }
}

function* fetchFlightDates(action) {
  try {
    const { dates } = yield call(API.getDates, action);

    yield put({
      type: types.RECEIVE_FLIGHT_DATES,
      dates: getDatesCount(dates)
    });
  } catch (e) {
    yield put({ type: types.ERROR, message: errors.ERROR_FETCHING_DATES });
  }
}

function* fetchFlightsByPilot(action) {
  try {
    const data = yield call(API.getFlightsByPilot, action);

    yield put({
      type: types.RECEIVE_FLIGHTS_BY_PILOT,
      flights: data.flightData.flights,
      pages: data.pages,
      total: data.total
    });
  } catch (e) {
    yield put({ type: types.ERROR, message: errors.ERROR_FETCHING_FLIGHTS_BY_PILOT});
  }
}

function* fetchFlightsByDistance(action) {
  try {
    const data = yield call(API.getFlightsByDistance, action);

    yield put({
      type: types.RECEIVE_FLIGHTS_BY_DISTANCE,
      flights: data.flightData.flights,
      pages: data.pages,
      total: data.total
    });
  } catch (e) {
    yield put({ type: types.ERROR, message: errors.ERROR_FETCHING_FLIGHTS_BY_DISTANCE});
  }
}

function* fetchFlightsByDate(action) {
  try {
    const data = yield call(API.getFlightsByDate, action);

    yield put({
      type: types.RECEIVE_FLIGHTS_BY_DATE,
      flights: data.flightData.flights,
      pages: data.pages,
      total: data.total
    });
  } catch (e) {
    yield put({ type: types.ERROR, message: errors.ERROR_FETCHING_FLIGHTS_BY_DATE});
  }
}

function* fetchFlightExport() {
  yield call(API.getExport);
}

function* mySaga() {
  yield takeLatest('FETCH_PILOTS', fetchPilots);
  yield takeLatest('FETCH_FLIGHT_DATES', fetchFlightDates);
  yield takeLatest('FETCH_FLIGHTS_BY_DATE', fetchFlightsByDate);
  yield takeLatest('FETCH_FLIGHTS_BY_PILOT', fetchFlightsByPilot);
  yield takeLatest('FETCH_FLIGHTS_BY_DISTANCE', fetchFlightsByDistance);
  yield takeLatest('FETCH_FLIGHT_EXPORT', fetchFlightExport);
}

export default mySaga;
