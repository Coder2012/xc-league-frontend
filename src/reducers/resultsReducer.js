import initialState from './initialState';
import {
  FETCH_FLIGHTS,
  RECEIVE_FLIGHTS,
  FETCH_FLIGHT_DATES,
  RESET_FLIGHT_DATES,
  RECEIVE_FLIGHT_DATES,
  FETCH_FLIGHTS_BY_DATE,
  RECEIVE_FLIGHTS_BY_DATE,
  FETCH_PILOTS,
  RECEIVE_PILOTS,
  FETCH_FLIGHTS_BY_PILOT,
  RECEIVE_FLIGHTS_BY_PILOT,
  FETCH_FLIGHTS_BY_DISTANCE,
  RECEIVE_FLIGHTS_BY_DISTANCE,
  RESET_FLIGHTS,
  FETCHING,
  ERROR,
  CLEAR_ERROR
} from '../actions/actionTypes';

export default function results(
  state = initialState,
  { type, flights, dates, pages, total, pilots, isFetching, message }
) {
  if (!type) {
    return state;
  }

  switch (type) {
    case FETCH_PILOTS:
      return state;

    case RECEIVE_PILOTS:
      return { ...state, pilots };

    case FETCH_FLIGHTS:
      return type;

    case FETCHING:
      return { ...state, isFetching };

    case ERROR:
      return { ...state, isFetching, message };

    case CLEAR_ERROR:
      return { ...state, message };

    case RECEIVE_FLIGHTS:
      return { ...state, flights };

    case FETCH_FLIGHT_DATES:
      return state;

    case RESET_FLIGHT_DATES:
      return { ...state, dates };

    case RECEIVE_FLIGHT_DATES:
      return { ...state, dates };

    case FETCH_FLIGHTS_BY_DATE:
      return state;

    case RECEIVE_FLIGHTS_BY_DATE:
      return { ...state, flights, pages, total };

    case FETCH_FLIGHTS_BY_PILOT:
      return state;

    case RECEIVE_FLIGHTS_BY_PILOT:
      return { ...state, flights, pages, total };

    case FETCH_FLIGHTS_BY_DISTANCE:
      return state;

    case RECEIVE_FLIGHTS_BY_DISTANCE:
      return { ...state, flights, pages, total };

    case RESET_FLIGHTS:
      return { ...state, flights };

    default:
      return state;
  }
}
