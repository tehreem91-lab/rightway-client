import { FETCH_CURRENT_ID, UPDATE_CURRENT_ID } from "../constants/actionTypes.js";

export default (CurrentIdState = null, action) => {
  switch (action.type) {
    case FETCH_CURRENT_ID:
      return CurrentIdState;
    case UPDATE_CURRENT_ID:
      return action.payload;
    default:
      return CurrentIdState;
  }
};
