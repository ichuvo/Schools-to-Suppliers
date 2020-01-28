import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_PRODUCT,
  ADD_BATCHPRODUCT
} from "../actions/types";

const initialState = {
  products: []
};

//The reducer is a pure function that takes the previous state and an action,
// and returns the next state. (Product reducer)
// set default parameter to initialState
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state, // spread operator (entire state). State is defined by the initial state (everything in the brackets)
        products: action.payload //fetched from the server with the action.
      };
    case DELETE_PRODUCT:
      return {
        ...state, // spread operator (entire state)
        // return only those that were not matching the deleted ids
        products: state.products.filter(product => product.id != action.payload) // first delete it on the server then delete on the UI by updating the state in the reducer
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload] // adding existing products + new product from payload.
      };
    case ADD_BATCHPRODUCT:
      return {
        ...state,
        products: [...state.products, ...action.payload]
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.payload.id) {
            product = action.payload;
          }
          return { ...product };
        })
      };
    default:
      return state;
  }
}
