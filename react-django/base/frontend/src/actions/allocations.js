import axios from "axios";

import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_ALLOCATIONS,
  DELETE_ALLOCATION,
  ADD_ALLOCATION,
  ADD_ALLOCATIONS,
  UPDATE_ALLOCATION
} from "./types";

export const getAllocations = () => (dispatch, getState) => {
  axios
    .get("/api/allocations/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLOCATIONS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteAllocation = id => (dispatch, getState) => {
  axios
    .delete(`/api/allocations/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteAllocation: "Products Deallocated" }));
      dispatch({
        type: DELETE_ALLOCATION,
        payload: id
      });
    })
    .catch(error => {
      returnErrors(error.response.data, error.response.status);
    });
};

export const addAllocation = allocations => (dispatch, getState) => {
  axios
    .post("/api/allocations/", allocations, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addAllocation: "Product allocated to user" }));
      const {type} = allocations;
      if (type === 0) {
        dispatch({
          type: ADD_ALLOCATION,
          payload: res.data
        });
      } else if (type === 1) {
        dispatch({
          type: ADD_ALLOCATIONS,
          payload: res.data
        });
      }
      
    })
    .catch(error => {
      dispatch(
        createMessage({ wrongInput: "Please check quantity and stock levels" })
      );
      console.log(error);
    });
};

export const updateAllocation = (id, allocations) => (dispatch, getState) => {
  axios
    .put(`/api/allocations/${id}/`, allocations, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateAllocation: "Allocation Updated" }));
      dispatch({
        type: UPDATE_ALLOCATION,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
