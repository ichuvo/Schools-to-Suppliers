import axios from "axios";

import { GET_REVIEWS, DELETE_REVIEW, ADD_REVIEW } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

export const getReviews = () => (dispatch, getState) => {
  axios
    .get("/api/reviews/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_REVIEWS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteReview = id => (dispatch, getState) => {
  axios
    .delete(`/api/reviews/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteReview: "Review Deleted" }));
      dispatch({
        type: DELETE_REVIEW,
        payload: id
      });
    })
    .catch(error => {
      returnErrors(error.response.data, error.response.status);
    });
};

export const addReview = type => (dispatch, getState) => {
  axios
    .post("/api/reviews/", type, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addReview: "Review Added" }));
      dispatch({
        type: ADD_REVIEW,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};
