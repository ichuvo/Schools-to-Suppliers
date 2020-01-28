import {
  GET_USERS,
  DELETE_USER,
  ADD_USER,
  LOGOUT_SUCCES,
  UPDATE_USER
} from "../actions/types.js";

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id != action.payload)
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user]
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.id) {
            user = action.payload;
          }
          return { ...user };
        })
      };

    case LOGOUT_SUCCES:
      return {
        ...state,
        users: []
      };
    default:
      return state;
  }
}
