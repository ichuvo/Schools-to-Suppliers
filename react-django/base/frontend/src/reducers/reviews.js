import {
  GET_REVIEWS,
  DELETE_REVIEW,
  ADD_REVIEW
} from "../actions/types";

const initialState = {
  reviews: []
};

//The reducer is a pure function that takes the previous state and an action,
// and returns the next state. (Product reducer)
// set default parameter to initialState
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state, // spread operator (entire state). State is defined by the initial state (everything in the brackets)
        reviews: action.payload //fetched from the server with the action.
      };
    case DELETE_REVIEW:
      return {
        ...state, // spread operator (entire state)
        // return only those that were not matching the deleted ids
        reviews: state.reviews.filter(review => review.id != action.payload) // first delete it on the server then delete on the UI by updating the state in the reducer
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload] // adding existing products + new product from payload.
      };
    default:
      return state;
  }
}
