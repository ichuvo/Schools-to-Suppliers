import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addType } from "../../actions/pTypes";

export class Form extends Component {
  state = {
    name: ""
  };

  static propTypes = {
    // some submission func here
    addType: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const type = {
      name
    };
    this.props.addType(type);
    // request here
    this.setState({
      name: ""
    });
  };

  render() {
    const { name } = this.state;
    return (
      <div className="card mb-3">
        <h3 className="card-header">Create a Type</h3>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Types name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter name of new Type"
                onChange={this.onChange}
                value={name}
                required
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
  { addType }
)(Form);
