import { GET_ERRORS } from "../actions/types";
import { RESET_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case RESET_ERRORS:
      return {};
    default:
      return state;
  }
}
