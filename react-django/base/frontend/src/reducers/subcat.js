import {
  GET_SUBCAT,
  UPDATE_SUBCAT,
  ADD_SUBCAT,
  DELETE_SUBCAT
} from "../actions/types.js";

const initialState = {
  subcategories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUBCAT:
      return {
        ...state,
        subcategories: action.payload
      };
    case DELETE_SUBCAT:
      return {
        ...state,
        subcategories: state.subcategories.filter(
          subcat => subcat.id != action.payload
        )
      };
    case ADD_SUBCAT:
      return {
        ...state,
        subcategories: [...state.subcategories, action.payload]
      };
    case UPDATE_SUBCAT:
      return {
        ...state,
        subcategories: state.subcategories.map(subcat => {
          if (subcat.id === action.payload.id) {
            subcat = action.payload;
          }
          return { ...subcat };
        })
      };
    default:
      return state;
  }
}
