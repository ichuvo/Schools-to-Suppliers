import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Typeahead } from "react-bootstrap-typeahead";

import { addSubcat } from "../../actions/subcategory";

import { createMessage, returnErrors } from "../../actions/messages";
import store from "../../store";

export class SubForm extends Component {
  state = {
    category: "",
    name: ""
  };

  static propTypes = {
    addSubcat: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { category, name } = this.state;
    if (category === "") {
      store.dispatch(
        createMessage({
          wrongInput: "Please select a parent category"
        })
      );
    } else {
      const subcategory = {
        // map values to an object
        category,
        name
      };

      this.props.addSubcat(subcategory);

      this.setState({
        category: "",
        name: ""
      });

      this.typeahead1.clear();
    }
  };

  render() {
    const { category, name } = this.state;
    return (
      <div className="card mb-3">
        <h3 className="card-header">Create Subcategory</h3>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Category</label>
              <Typeahead
                id="test2"
                placeholder="Choose category..."
                onChange={selected => {
                  this.setState({
                    category: selected[0] ? selected[0].id : ""
                  });
                }}
                labelKey="name"
                options={this.props.categories}
                ref={typeahead => (this.typeahead1 = typeahead)}
              />
            </div>
            <div className="form-group">
              <label>Subcategory name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter subcategory name"
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
  { addSubcat }
)(SubForm);
