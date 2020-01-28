import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Form from "./Form";
import Categories from "./Categories";
import { getCategories } from "../../actions/categories";
import SubForm from "./SubForm";

export class CategoriesDashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { isAdmin } = this.props.auth;
    return (
      <div>
        <div className="container">
          <Categories />
          {isAdmin ? <Form /> : ""}
        </div>
        <div className="container">
          {isAdmin ? <SubForm categories={this.props.categories} /> : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  categories: state.categories.categories
});

export default connect(
  mapStateToProps,
  { getCategories }
)(CategoriesDashboard);
