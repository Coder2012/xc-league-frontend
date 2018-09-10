import initialState from './initialState';
import {
    SET_SEARCH_TYPE
} from '../actions/actionTypes';

export default function search(state = { searchType: '' }, { type, searchType}) {
    if(!type){
        return state;
    }

    switch(type) {
        case SET_SEARCH_TYPE:
        return Object.assign({}, state, { searchType })

        default:
            return state;
    }
}