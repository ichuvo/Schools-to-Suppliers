import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addCategory } from "../../actions/categories";

export class Form extends Component {
  state = {
    name: ""
  };

  static propTypes = {
    // some submission func here
    addCategory: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const category = {
      name
    };
    // request here
    this.props.addCategory(category);

    this.setState({
      name: ""
    });
  };

  render() {
    const { name } = this.state;
    return (
      <div className="card mb-3">
        <h3 className="card-header">Create Category</h3>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Category name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter name of new category"
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
  { addCategory }
)(Form);
