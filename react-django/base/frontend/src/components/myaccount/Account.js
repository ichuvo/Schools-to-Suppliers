import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateUser } from "../../actions/users";

export class Account extends Component {
  render() {}
}

//Takes a state of redux to props of the component
const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(
  mapStateToProps,
  { updateUser }
)(Users);
