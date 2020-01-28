import axios from "axios";

import { GET_SUBCAT, UPDATE_SUBCAT, ADD_SUBCAT, DELETE_SUBCAT } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

export const getSubcat = () => (dispatch, getState) => {
  axios
    .get("/api/subcategories/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SUBCAT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteSubcat = id => (dispatch, getState) => {
  axios
    .delete(`/api/subcategories/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteSubCat: "Subcategory Deleted" }));
      dispatch({
        type: DELETE_SUBCAT,
        payload: id
      });
    })
    .catch(error => {
      returnErrors(error.response.data, error.response.status);
    });
};

export const addSubcat = subcat => (dispatch, getState) => {
  axios
    .post("/api/subcategories/", subcat, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addSubCat: "Subcategory Added" }));
      dispatch({
        type: ADD_SUBCAT,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const updateSubcat = (id, subcat) => (dispatch, getState) => {
  axios
    .put(`/api/subcategories/${id}/`, subcat, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateSubCat: "Subcategory Updated" }));
      dispatch({
        type: UPDATE_SUBCAT,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};
