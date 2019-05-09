import * as types from './actionTypes';

export function setSearchType(type) {
  return {
    type: types.SET_SEARCH_TYPE,
    searchType: type
  };
}

export function hideRaspForm(value) {
  return {
    type: types.HIDE_RASP_FORM,
    hideForm: value
  };
}

export function resetFlights() {
  return {
    type: types.RESET_FLIGHTS,
    flights: []
  };
}

export function clearError() {
  return {
    type: types.CLEAR_ERROR,
    message: null
  };
}
