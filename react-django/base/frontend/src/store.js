import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

//State container for javascript apps
const store = createStore(
  rootReducer,
  initialState,
  //spread operator processes components of the array individually. Pass to the function which expects multiple individual elements
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
