import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Form from "./Form";
import Types from "./Types";

function TypesDashboard({ auth }) {
  const { isAdmin } = auth;

  return (
    <div className="container">
      <Types />
      {isAdmin ? <Form /> : ""}
    </div>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(TypesDashboard);
