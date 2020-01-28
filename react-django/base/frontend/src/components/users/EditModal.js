import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Typeahead } from "react-bootstrap-typeahead";
import ModalComponent from "../layout/ModalComponent";
import { updateUser } from "../../actions/users";
import store from "../../store";
import { create } from "../../actions/auth";
import { createMessage, returnErrors } from "../../actions/messages";

export class EditModal extends Component {
  static propTypes = {
    exists: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired
  };

  state = {
    id: "",
    email: "",
    institute: "",
    contact_number: "",
    institute_size: "",
    address: "",
    suburb: "",
    postcode: "",
    group: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.user !== null &&
        Object.keys(this.props.user).length !== 0
      ) {
        this.setState({
          id: this.props.user.id,
          email: this.props.user.email,
          institute: this.props.user.institute,
          contact_number: this.props.user.contact_number,
          institute_size: this.props.user.institute_size,
          address: this.props.user.address,
          suburb: this.props.user.suburb,
          postcode: this.props.user.postcode,
          group: this.props.user.group ? this.props.user.group.id : ""
        });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const {
      id,
      email,
      institute,
      contact_number,
      institute_size,
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
    } else {
      const user = {
        email,
        institute,
        contact_number,
        institute_size,
        address,
        suburb,
        postcode,
        group
      };
      this.props.updateUser(id, user);
    }
  };

  render() {
    return (
      <ModalComponent
        title={"Edit user details"}
        button="Edit"
        exists={this.props.exists}
        body={
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                onChange={this.onChange}
                value={this.state.email}
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
                value={this.state.institute}
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
                value={this.state.contact_number}
              />
            </div>
            <div className="form-group">
              <label>Institute Size</label>
              <select
                className="form-control"
                value={this.state.institute_size}
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
                value={this.state.address}
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
                value={this.state.suburb}
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
                onChange={this.onChange}
                value={this.state.postcode}
                maxLength="4"
                required
              />
            </div>
            <div className="form-group">
              <label>Group</label>
              <Typeahead
                id="test2"
                placeholder="Choose group..."
                onChange={selected => {
                  this.setState({
                    group: selected[0] ? selected[0].id : ""
                  });
                }}
                labelKey="name"
                options={this.props.groups}
                defaultSelected={
                  this.props.user.group ? [this.props.user.group] : []
                }
              />
            </div>
            <input type="hidden" value={this.state.id} />
            <Button type="submit">Save changes</Button>
          </form>
        }
      />
    );
  }
}

export default connect(
  null,
  { updateUser }
)(EditModal);
