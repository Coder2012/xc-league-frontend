import { SET_SEARCH_TYPE, HIDE_RASP_FORM } from "../actions/actionTypes";

export default function search(
  state = { searchType: "" },
  { type, searchType, hideForm }
) {
  if (!type) {
    return state;
  }

  switch (type) {
    case SET_SEARCH_TYPE:
      return Object.assign({}, state, { searchType });

    case HIDE_RASP_FORM:
      return Object.assign({}, state, { hideForm })

    default:
      return state;
  }
}
