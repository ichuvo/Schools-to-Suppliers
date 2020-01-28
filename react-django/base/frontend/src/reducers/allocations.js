import {
  GET_ALLOCATIONS,
  DELETE_ALLOCATION,
  ADD_ALLOCATION,
  ADD_ALLOCATIONS,
  UPDATE_ALLOCATION
} from "../actions/types.js";

const initialState = {
  allocations: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALLOCATIONS:
      return {
        ...state,
        allocations: action.payload
      };
    case DELETE_ALLOCATION:
      return {
        ...state,
        allocations: state.allocations.filter(
          allocation => allocation.id != action.payload
        )
      };
    case ADD_ALLOCATION:
      return {
        ...state,
        allocations: [...state.allocations, action.payload]
      };
    case ADD_ALLOCATIONS:
      return {
        ...state,
        allocations: [...state.allocations, ...action.payload]
      };
    case UPDATE_ALLOCATION:
      return {
        ...state,
        allocations: state.allocations.map(allocation => {
          if (allocation.id === action.payload.id) {
            allocation = action.payload;
          }
          return { ...allocation };
        })
      };
    default:
      return state;
  }
}
