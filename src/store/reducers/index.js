import { combineReducers } from "redux";

import NavState from "./NavState";
import UserReducer from "./RoleReducers/user"; 
import IdToBeUpdate from "./IdToBeUpdate"; 
import NavReducer from './NavReducer'
import TreeReducer from "./TreeReducer";




export const reducers = combineReducers({ NavState ,UserReducer , IdToBeUpdate , NavReducer , TreeReducer  });
