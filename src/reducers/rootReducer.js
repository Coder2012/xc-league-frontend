import { combineReducers } from 'redux';
import results from './resultsReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
    results,
    search
});

export default rootReducer;