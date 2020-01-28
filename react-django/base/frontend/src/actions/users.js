import axios from "axios";

// axios is HTTP requests
import { GET_USERS, DELETE_USER, ADD_USER, UPDATE_USER } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// So this is the logic for React to send requests to the Django backend
// I'll run through GET USERS as an example
// first a GET request to /api/users endpoint is made
// when it recieves the data, it dispatches the response back to the caller (?) with a type and the payload
// the payload is what the backend gave it (var res)
// - Alex

// GET USERS
export const getUsers = () => (dispatch, getState) => {
  axios
    .get("/api/users/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

// DELETE USER
export const deleteUser = id => (dispatch, getState) => {
  axios
    .delete(`/api/users/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteUser: "User Deleted" }));
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    })
    .catch(error => {
      returnErrors(error.response.data, error.response.status);
    });
};

// ADD USER
export const addUser = user => (dispatch, getState) => {
  axios
    .post("/api/users/", user, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addUser: "User Added" }));
      dispatch({
        type: ADD_USER,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

// EDIT USER
export const updateUser = (id, user) => (dispatch, getState) => {
  // const body = JSON.stringify({ email, password, institute, contact_number });
  axios
    .put(`/api/users/${id}/`, user, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateUser: "User Updated" }));
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
      dispatch(
        createMessage({
          wrongInput: "Could not update user, please make sure institution email is unique"
        })
      );
    });
};
