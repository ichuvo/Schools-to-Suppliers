import axios from "axios";

import { GET_GROUPS, UPDATE_GROUP, ADD_GROUP, DELETE_GROUP } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

export const getGroups = () => (dispatch, getState) => {
  axios
    .get("/api/groups/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteGroup = id => (dispatch, getState) => {
  axios
    .delete(`/api/groups/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteGroup: "Group Deleted" }));
      dispatch({
        type: DELETE_GROUP,
        payload: id
      });
    })
    .catch(error => {
      returnErrors(error.response.data, error.response.status);
    });
};

export const addGroup = group => (dispatch, getState) => {
  axios
    .post("/api/groups/", group, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addGroup: "Group Added" }));
      dispatch({
        type: ADD_GROUP,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const updateGroup = (id, group) => (dispatch, getState) => {
  axios
    .put(`/api/groups/${id}/`, group, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateGroup: "Group Updated" }));
      dispatch({
        type: UPDATE_GROUP,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};
