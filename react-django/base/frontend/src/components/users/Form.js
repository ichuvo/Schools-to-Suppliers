import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../store";
import { Typeahead } from "react-bootstrap-typeahead";
import { create } from "../../actions/auth";
import { createMessage, returnErrors } from "../../actions/messages";
import { Link } from "react-router-dom";

export class Form extends Component {
  state = {
    email: "",
    password: "",
    institute: "",
    contact_number: "",
    institute_size: "0-100",
    created_at: "",
    address: "",
    suburb: "",
    postcode: "",
    group: ""
  };

  static propTypes = {
    create: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      email,
      password,
      institute,
      contact_number,
      institute_size,
      created_at,
      address,
      suburb,
      postcode,
      group
    } = this.state;
    if (!/^[0-9]{8,10}$/.test(contact_number)) {
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
    } else if (group === "") {
      store.dispatch(
        createMessage({
          wrongInput: "Please select a group"
        })
      );
    } else {
      const user = {
        email,
        password,
        institute,
        contact_number,
        institute_size,
        created_at,
        address,
        suburb,
        postcode,
        group
      };
      this.props.create(user);
      this.setState({
        email: "",
        password: "",
        institute: "",
        contact_number: "",
        created_at: "",
        address: "",
        suburb: "",
        postcode: "",
        group: ""
      });
      this.typeahead2.clear();
    }
  };

  render() {
    const {
      email,
      password,
      institute,
      contact_number,
      institute_size,
      address,
      suburb,
      postcode,
      group
    } = this.state;
    return (
      <div className="card mb-3">
        <h3 className="card-header">Create User</h3>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Email address</label>
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
              <label>Institute</label>
              <input
                type="text"
                className="form-control"
                name="institute"
                placeholder="Enter institute name"
                onChange={this.onChange}
                value={institute}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact number</label>
              <input
                type="tel"
                className="form-control"
                name="contact_number"
                placeholder="Enter contact number"
                onChange={this.onChange}
                value={contact_number}
                required
              />
            </div>
            <div className="form-group">
              <label>Institute size</label>
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
            <div className="form-group">
              <label>Group</label>
              <Typeahead
                id="test"
                placeholder="Choose group..."
                onChange={selected => {
                  this.setState({
                    group: selected[0] ? selected[0].name : ""
                  });
                }}
                labelKey="name"
                options={this.props.groups}
                allowNew
                newSelectionPrefix="Add new group: "
                ref={typeahead => (this.typeahead2 = typeahead)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <div align="right">
              <Link to="/manage/adminhelp#one">
                <button type="button" className="btn btn-info">
                  Help
                </button>
              </Link>
            </div>
          </form>
        </div>
        <script></script>
      </div>
    );
  }
}

export default connect(
  null,
  { create }
)(Form);
