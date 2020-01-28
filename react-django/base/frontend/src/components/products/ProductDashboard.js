import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Form from "./Form";
import Products from "./Products";

import { getCategories } from "../../actions/categories";
import { getTypes } from "../../actions/pTypes";
import { getReviews, addReview, deleteReview } from "../../actions/reviews";


export class ProductDashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    types: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    reviews: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getTypes();
    //this.props.getReviews();
  }

  render() {
    const { isAdmin } = this.props.auth;
    return (
      <div>
        <div>
          <Products
            categories={this.props.categories}
            types={this.props.types}
          />
        </div>
        <div className="container">
          {isAdmin ? (
            <Form categories={this.props.categories} types={this.props.types} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  categories: state.categories.categories,
  types: state.types.types,
  reviews: state.reviews.reviews
});

export default connect(
  mapStateToProps,
  { getCategories, getTypes, getReviews, addReview, deleteReview }
)(ProductDashboard);
