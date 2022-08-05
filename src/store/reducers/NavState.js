import { ShowNavTrue, ShowNavFalse } from "../constants/actionTypes.js";

export default (NavState = true, action) => {
  switch (action.type) {
    case ShowNavTrue:
      return true;
    case ShowNavFalse:
      return false;
    default:
      return NavState;
  }
};
