import axios from "axios";

import { createMessage, returnErrors } from "./messages";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCES,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADD_USER,
  CREATION_FAIL
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch(error => {
      console.log(error);
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const login = (email, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(error => {
      console.log(error);
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({ type: LOGOUT_SUCCES });
    })
    .catch(error => {
      console.log(error);
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const changePassword = (password, token) => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    token,
    password
  });

  axios
    .post("/api/auth/password_reset/confirm/", body, config)
    .then(dispatch(createMessage({ changePassword: "Password changed!" })))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const resetPassword = email => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email });

  axios
    .post("/api/auth/password_reset/", body, config)
    .then(dispatch(createMessage({ resetPassword: "Email sent!" })))
    .catch(error => {
      console.log(error);
    });
};

export const register = ({
  email,
  password,
  institute,
  contact_number,
  institute_size,
  address,
  suburb,
  postcode,
  group
}) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    email,
    password,
    institute,
    contact_number,
    institute_size,
    address,
    suburb,
    postcode,
    group
  });

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch(error => {
      console.log(error);
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: REGISTER_FAIL });
    });
};

export const create = ({
  email,
  password,
  institute,
  contact_number,
  institute_size,
  address,
  suburb,
  postcode,
  group
}) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    email,
    password,
    institute,
    contact_number,
    institute_size,
    address,
    suburb,
    postcode,
    group
  });

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      dispatch(createMessage({ addUser: "User Added" }));
      dispatch({ type: ADD_USER, payload: res.data });
      dispatch(resetPassword(email));
    })
    .catch(error => {
      console.log(error);
      dispatch(
        createMessage({
          wrongInput: "Account creation failed, please make sure email is unique"
        })
      );
      //dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: CREATION_FAIL });
    });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
