import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addGroup } from "../../actions/groups";

export class Form extends Component {
  state = {
    name: ""
  };

  static propTypes = {
    // some submission func here
    addGroup: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const group = {
      name
    };

    this.props.addGroup(group);
    this.setState({
      name: ""
    });
  };

  render() {
    const { name } = this.state;
    return (
      <div className="card mb-3">
        <h3 className="card-header">Create Group</h3>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Group name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter name of new group"
                onChange={this.onChange}
                value={name}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addGroup }
)(Form);
