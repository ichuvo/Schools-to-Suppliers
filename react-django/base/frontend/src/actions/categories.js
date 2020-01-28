import axios from "axios";

import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  ADD_CATEGORY,
  DELETE_CATEGORY
} from "./types";

export const getCategories = () => (dispatch, getState) => {
  axios
    .get("/api/categories/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteCategory = id => (dispatch, getState) => {
  axios
    .delete(`/api/categories/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteCategory: "Category Deleted" }));
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const addCategory = category => (dispatch, getState) => {
  axios
    .post("/api/categories/", category, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addCategory: "Category Added" }));
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const updateCategory = (id, category) => (dispatch, getState) => {
  axios
    .put(`/api/categories/${id}/`, category, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateCategory: "Category Updated" }));
      dispatch({
        type: UPDATE_CATEGORY,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};
