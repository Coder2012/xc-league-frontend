import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { getDatesCount } from '../helpers/date';
import * as API from '../data/API';

function* fetchPilots() {
  try {
    const { pilots } = yield call(API.getPilots);

    yield put({ type: types.RECEIVE_PILOTS, pilots });
  } catch (e) {
    yield put({ type: 'ERROR_FETCHING_PILOTS', message: e.message });
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
    console.log('Error receiving flights by date');
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
    console.log('failed fetching flights by pilot');
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
    console.log('failed to get flights by distance');
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
  } catch (e) {}
}

function* fetchFlightExport() {
  yield call(API.getExport);
}

function* mySaga() {
  yield takeEvery('FETCH_PILOTS', fetchPilots);
  yield takeEvery('FETCH_FLIGHT_DATES', fetchFlightDates);
  yield takeEvery('FETCH_FLIGHTS_BY_DATE', fetchFlightsByDate);
  yield takeEvery('FETCH_FLIGHTS_BY_PILOT', fetchFlightsByPilot);
  yield takeEvery('FETCH_FLIGHTS_BY_DISTANCE', fetchFlightsByDistance);
  yield takeEvery('FETCH_FLIGHT_EXPORT', fetchFlightExport);
}

export default mySaga;
