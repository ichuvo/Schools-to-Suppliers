import {
  GET_TYPES,
  DELETE_TYPE,
  ADD_TYPE,
  UPDATE_TYPE
} from "../actions/types.js";

const initialState = {
  types: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TYPES:
      return {
        ...state,
        types: action.payload
      };
    case DELETE_TYPE:
      return {
        ...state,
        types: state.types.filter(type => type.id != action.payload)
      };
    case ADD_TYPE:
      return {
        ...state,
        types: [...state.types, action.payload]
      };
    case UPDATE_TYPE:
      return {
        ...state,
        types: state.types.map(type => {
          if (type.id === action.payload.id) {
            type = action.payload;
          }
          return { ...type };
        })
      };
    default:
      return state;
  }
}
