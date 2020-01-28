import {
  GET_CATEGORIES,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  ADD_SUBCAT
} from "../actions/types.js";

const initialState = {
  categories: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.id != action.payload
        )
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    case ADD_SUBCAT:
      return {
        ...state,
        categories: state.categories.map(category => {
          if (action.payload.parent_category.name === category.name) {
            category.subcategories.push(action.payload);
          }
          return { ...category };
        })
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category.id === action.payload.id) {
            category = action.payload;
          }
          return { ...category };
        })
      };
    default:
      return state;
  }
}
