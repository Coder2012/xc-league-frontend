import * as types from "./actionTypes";
import { getDatesCount } from "../helpers/date";

const domain = "https://xc-league.herokuapp.com";
// const domain = (process.env.NODE_ENV === 'production')? 'https://xc-league.herokuapp.com' : 'http://localhost:3000';

export function receivePilotNames({ pilots }) {
  return { type: types.RECEIVE_PILOTS, pilots };
}

export function receiveFlights(data) {
  return {
    type: types.RECEIVE_FLIGHTS,
    flights: data.flightData.flights,
    pages: data.pages,
    total: data.total
  };
}

export function receiveFlightDates(data) {
  return { type: types.RECEIVE_FLIGHT_DATES, dates: getDatesCount(data.dates) };
}

export function resetFlightDates() {
  return { type: types.RESET_FLIGHT_DATES, dates: [] };
}

export function receiveFlightsByDate(data) {
  return {
    type: types.RECEIVE_FLIGHTS_BY_DATE,
    flights: data.flightData.flights,
    pages: data.pages,
    total: data.total
  };
}

export function receiveFlightsByPilot(data) {
  return {
    type: types.RECEIVE_FLIGHTS_BY_PILOT,
    flights: data.flightData.flights,
    pages: data.pages,
    total: data.total
  };
}

export function receiveFlightsByDistance(data) {
  return {
    type: types.RECEIVE_FLIGHTS_BY_DISTANCE,
    flights: data.flightData.flights,
    pages: data.pages,
    total: data.total
  };
}

export function resetFlights() {
  return {
    type: types.RESET_FLIGHTS,
    flights: []
  };
}

export function fetchPilots() {
  return dispatch => {
    fetch(`${domain}/flights/pilots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then(response =>
        response.json().then(data => ({
          data: data,
          status: response.status
        }))
      )
      .then(response => {
        if (response.status === 200) {
          dispatch(receivePilotNames(response.data));
        }
      });
  };
}

export function fetchFlightsByPilot(pilot, limit, page, responseType = "full") {
  return dispatch => {
    fetch(`${domain}/flights/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
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
          dispatch(receiveFlightsByPilot(response.data));
        }
      });
  };
}

export function fetchFlightsByDistance(
  distance,
  limit,
  page,
  responseType = "full"
) {
  return dispatch => {
    fetch(`${domain}/flights/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
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
          dispatch(receiveFlightsByDistance(response.data));
        }
      });
  };
}

export function fetchFlightDates(startDate, endDate) {
  return dispatch => {
    fetch(`${domain}/flights/dates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
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
      .then(async response => {
        if (response.status === 200) {
          dispatch(receiveFlightDates(response.data));
        }
      });
  };
}

export function fetchFlights() {
  return dispatch => {
    fetch(`${domain}/flights/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        page: 1, //this.state.controls.page,
        limit: 25, //this.state.controls.limit,
        responseType: "full" //this.state.controls.responseType
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
          dispatch(receiveFlights(response.data));
        }
      });
  };
}

export function fetchFlightsByDate(
  date,
  limit = 10,
  page = 1,
  responseType = "full"
) {
  return dispatch => {
    fetch(`${domain}/flights/date`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
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
          dispatch(receiveFlightsByDate(response.data));
        }
      });
  };
}

export function fetchFlightsExport(flights = []) {
  return dispatch => {
    // fetch(`${domain}/flights/export`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/vnd.openxmlformats'
    //     },
    //     mode: 'cors'
    // })
    // .then(response => console.log(response));
    window.location = `${domain}/flights/export`;
  };
}
