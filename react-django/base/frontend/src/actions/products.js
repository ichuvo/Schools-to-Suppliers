import axios from "axios"; // package for requests

import { createMessage, returnErrors } from "./messages"; // sends messages
import { tokenConfig } from "./auth";

import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_PRODUCT,
  ADD_BATCHPRODUCT
} from "../actions/types";

// actions talk to reducers
// actions are called from the components (make request here...)
// GET PRODUCTS
export const getProducts = () => (dispatch, getState) => {
  axios
    .get("/api/products/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data // data received from the server after asking for a get request
      });
    })
    .catch(error => {
      console.log(error);
    });
};

// DELETE PRODUCT
export const deleteProduct = id => (dispatch, getState) => {
  axios
    .delete(`/api/products/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteProduct: "Product Deleted" }));
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      });
    })
    .catch(error => {
      console.log(error);
    });
};

// EDIT PRODUCT
export const updateProduct = (id, product) => (dispatch, getState) => {
  // const body = JSON.stringify({ email, password, institute, contact_number });
  axios
    .put(`/api/products/${id}/`, product, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateProduct: "Product Updated" }));
      dispatch({
        type: UPDATE_PRODUCT,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

// ADD_PRODUCT
export const addProduct = product => (dispatch, getState) => {
  axios
    .post("/api/products/", product, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addProduct: "Product Added" }));
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data
      });
    })
    .catch(error => {
      //dispatch(returnErrors(error.response.data, error.response.status));
      console.log(error);
    });
};

export const CSVUpload = file => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.headers["Content-Type"] = "multipart/form-data";

  axios
    .post("/api/multiproduct/", file, config)
    .then(res => {
      dispatch(createMessage({ addProduct: "Products Added" }));
      dispatch({
        type: ADD_BATCHPRODUCT,
        payload: res.data
      });
    })
    .catch(error => {
      //dispatch(returnErrors(error.response.data, error.response.status));
      console.log(error);
    });
};
