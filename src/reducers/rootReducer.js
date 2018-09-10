import { combineReducers } from 'redux';
import flights from './flightsReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
    flights,
    search
});

export default rootReducer;