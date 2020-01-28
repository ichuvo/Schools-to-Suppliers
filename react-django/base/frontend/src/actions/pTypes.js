import axios from "axios";

import { GET_TYPES, DELETE_TYPE, ADD_TYPE, UPDATE_TYPE } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

export const getTypes = () => (dispatch, getState) => {
  axios
    .get("/api/types/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TYPES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteType = id => (dispatch, getState) => {
  axios
    .delete(`/api/types/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteType: "Type Deleted" }));
      dispatch({
        type: DELETE_TYPE,
        payload: id
      });
    })
    .catch(error => {
      returnErrors(error.response.data, error.response.status);
    });
};

export const addType = type => (dispatch, getState) => {
  axios
    .post("/api/types/", type, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addType: "Type Added" }));
      dispatch({
        type: ADD_TYPE,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const updateType = (id, type) => (dispatch, getState) => {
  axios
    .put(`/api/types/${id}/`, type, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateType: "Type Updated" }));
      dispatch({
        type: UPDATE_TYPE,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};
