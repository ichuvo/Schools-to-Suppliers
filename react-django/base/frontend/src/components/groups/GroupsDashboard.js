import React, { Fragment } from "react";
import { connect } from "react-redux";

import Form from "./Form";
import Groups from "./Groups";

function GroupsDashboard({ auth }) {
  const { isAdmin } = auth;

  return (
    <div className="container">
    <Fragment>
      <Groups />
      {isAdmin ? <Form /> : ""}
    </Fragment>
    </div>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(GroupsDashboard);
