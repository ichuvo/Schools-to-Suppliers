import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import store from "../../store";
import PropTypes from "prop-types";

import { createMessage, returnErrors } from "../../actions/messages";
import { register } from "../../actions/auth";

export class Register extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    institute: "",
    contact_number: "",
    institute_size: "0-100",
    address: "",
    suburb: "",
    postcode: "",
    group: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      email,
      password,
      password2,
      institute,
      contact_number,
      institute_size,
      address,
      suburb,
      postcode,
      group
    } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else if (!/^[0-9]{8,10}$/.test(contact_number)) {
      store.dispatch(
        createMessage({
          wrongInput: "Invalid phone number, please enter between 8-10 digits"
        })
      );
    } else if (!/^[0-9]{4}$/.test(postcode)) {
      store.dispatch(
        createMessage({
          wrongInput: "Please enter a valid Australian 4-digit postcode"
        })
      );
    } else {
      const newUser = {
        email,
        password,
        institute,
        contact_number,
        institute_size,
        address,
        suburb,
        postcode,
        group
      };
      this.props.register(newUser);
    }
  };

  onChange = e => {
    if (e.target.name !== "institute_size") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      if (e.target.value.includes(".")) {
        store.dispatch(
          createMessage({ wrongInput: "Institute size must be whole number" })
        );
      } else {
        this.setState({ [e.target.name]: e.target.value });
      }
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const {
      email,
      password,
      password2,
      institute,
      contact_number,
      institute_size,
      address,
      suburb,
      postcode,
      group
    } = this.state;
    return (
      <div className="container">
      <div className="card card-body mt-4 mb-4">
        <h1 style={{ fontFamily: "Roboto", textAlign: "center" }}>
          Account Registration
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
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
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
              placeholder="Confirm password"
              onChange={this.onChange}
              value={password2}
              required
            />
          </div>
          <div className="form-group">
            <label>Institute</label>
            <input
              type="text"
              className="form-control"
              name="institute"
              placeholder="Enter name"
              onChange={this.onChange}
              value={institute}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              className="form-control"
              name="contact_number"
              placeholder="Enter phone number"
              onChange={this.onChange}
              value={contact_number}
              required
            />
          </div>
          <div className="form-group">
            <label>Institute Size</label>
            <select
              className="form-control"
              value={institute_size}
              onChange={this.onChange}
              name="institute_size"
            >
              <option value="0-100">0-100</option>
              <option value="101-500">101-500</option>
              <option value="501-1000">501-1000</option>
              <option value="1000+">1000+</option>
            </select>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Enter the street address of your institute"
              onChange={this.onChange}
              value={address}
              required
            />
          </div>
          <div className="form-group">
            <label>Suburb</label>
            <input
              type="text"
              className="form-control"
              name="suburb"
              placeholder="Enter your institute's suburb"
              onChange={this.onChange}
              value={suburb}
              required
            />
          </div>
          <div className="form-group">
            <label>Postcode</label>
            <input
              type="text"
              className="form-control"
              name="postcode"
              placeholder="Enter your institute's postcode"
              maxLength="4"
              onChange={this.onChange}
              value={postcode}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, createMessage }
)(Register);
