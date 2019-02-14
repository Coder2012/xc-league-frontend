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
      return { ...state, searchType };

    case HIDE_RASP_FORM:
      return { ...state, hideForm };

    default:
      return state;
  }
}
