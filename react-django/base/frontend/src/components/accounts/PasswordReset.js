import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createMessage } from "../../actions/messages";
import { resetPassword } from "../../actions/auth";

class PasswordReset extends Component {
  state = {
    email: ""
  };

  static propTypes = {
    resetPassword: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    this.props.resetPassword(email);
  };

  render() {
    const { email } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h1 style={{ fontFamily: "Roboto", textAlign: "center" }}>
          Password Change
        </h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              onChange={this.onChange}
              value={email}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Reset
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { resetPassword, createMessage }
)(PasswordReset);
