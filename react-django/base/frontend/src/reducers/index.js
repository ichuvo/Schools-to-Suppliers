//Brings all the reducers together
//New reducers should be imported here and combined c:

//The reducer is a pure function that takes the previous state and an action,
// and returns the next state.
import { combineReducers } from "redux";
import users from "./users";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import products from "./products";
import reviews from "./reviews";
import types from "./types";
import categories from "./categories";
import allocations from "./allocations";
import subcat from "./subcat";
import groups from "./groups";
//Combines the imported reducers
export default combineReducers({
  users,
  errors,
  messages,
  auth,
  products,
  reviews,
  types,
  categories,
  allocations,
  groups,
  subcat
});
