import * as types from "./actionTypes";

export function setSearchType(type) {
  return {
    type: types.SET_SEARCH_TYPE,
    searchType: type
  };
}
