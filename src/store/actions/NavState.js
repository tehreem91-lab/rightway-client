import { ShowNavTrue, ShowNavFalse } from "../constants/actionTypes.js";
import { FETCH_CURRENT_ID, UPDATE_CURRENT_ID } from "../constants/actionTypes.js";

export const setNavSm = () => async (dispatch) => {
  try {
    dispatch({ type: ShowNavFalse });
  } catch (error) {
    console.log(error.message);
  }
};

export const setNavMd = () => async (dispatch) => {
  try {
    dispatch({ type: ShowNavTrue });
  } catch (error) {
    console.log(error.message);
  }
};

 

 

export const updateCurrentId = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CURRENT_ID , payload:id});
  } catch (error) {
    console.log(error.message);
  }
};
 