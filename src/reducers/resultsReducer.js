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
} from '../actions/actionTypes';

export default function results(state = initialState, { type, flights, dates, pages, total, pilots }) {
    if(!type) {
        return state;
    }
    
    switch (type) {
        case FETCH_PILOTS:
            return type;

        case RECEIVE_PILOTS:
            return Object.assign({}, state, { pilots })

        case FETCH_FLIGHTS:
            return type;

        case RECEIVE_FLIGHTS:
            return Object.assign({}, state, { flights });

        case FETCH_FLIGHT_DATES:
            return type;

        case RESET_FLIGHT_DATES:
            return Object.assign({}, state, { dates });

        case RECEIVE_FLIGHT_DATES:
            return Object.assign({}, state, { dates });

        case FETCH_FLIGHTS_BY_DATE:
            return type;

        case RECEIVE_FLIGHTS_BY_DATE:
            return Object.assign({}, state, { flights, pages, total });

        case FETCH_FLIGHTS_BY_PILOT:
            return type;

        case RECEIVE_FLIGHTS_BY_PILOT:
            return Object.assign({}, state, { flights, pages, total });

        case FETCH_FLIGHTS_BY_DISTANCE:
            return type;

        case RECEIVE_FLIGHTS_BY_DISTANCE:
            return Object.assign({}, state, { flights, pages, total });

        case RESET_FLIGHTS: 
            return Object.assign({}, state, { flights })

        default:
            return state;
    }
}