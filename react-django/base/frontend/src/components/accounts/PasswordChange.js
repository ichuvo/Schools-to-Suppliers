import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import PropTypes from "prop-types";

import { createMessage } from "../../actions/messages";
import { changePassword } from "../../actions/auth";

class PasswordChange extends Component {
  state = {
    password: "",
    password2: "",
    values: {}
  };

  static propTypes = {
    changePassword: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.state.values = queryString.parse(this.props.location.search);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { password, password2, values } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      this.props.changePassword(password, values.token);
    }
  };

  render() {
    const { password, password2 } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h1 style={{ fontFamily: "Roboto", textAlign: "center" }}>
          Password Change
        </h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter new password"
              onChange={this.onChange}
              value={password}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              placeholder="Confirm new password"
              onChange={this.onChange}
              value={password2}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { changePassword, createMessage }
)(PasswordChange);
