import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import store from "../../store";
import { Redirect } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory, {
  textFilter,
  numberFilter
} from "react-bootstrap-table2-filter";
import HeaderFormatter from "../layout/HeaderFormatter";
import { getReviews, addReview, deleteReview } from "../../actions/reviews";
import { createMessage, returnErrors } from "../../actions/messages";

import DeleteAlert from "../layout/DeleteAlert";

export class ProductPage extends Component {
  state = {
    currReview: {},
    title: "",
    comment: "",
    rating: "1",
    product: this.props.location.state.product.name
  };

  static propTypes = {
    // some submission func here
    auth: PropTypes.object.isRequired,
    addReview: PropTypes.func.isRequired,
    reviews: PropTypes.array.isRequired,
    getReviews: PropTypes.func.isRequired
  };

  componentDidMount() {
    //console.log("mount product page");
    this.props.getReviews();
    // console.log(
    //   typeof this.props.reviews === "undefined"
    //     ? "undefined"
    //     : this.props.reviews[0]
    // );
  }

  componentDidUpdate(prevProps) {
    // console.log("updating");
    // if (this.props !== prevProps) {
    //   if (this.props.reviews[0] != null) {
    //     this.state.reviews = this.props.reviews;
    //   }
    // }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    console.log("product is " + this.props.location.state.product);
    this.setState({
      product: this.props.location.state.product.name
    });

    const { title, comment, rating, product } = this.state;

    const review = {
      title,
      comment,
      rating,
      product
    };

    this.props.addReview(review);

    // request here
    this.setState({
      title: "",
      comment: "",
      rating: "1",
      product: this.props.location.state.product.name
    });
  };

  ratingFormatter(cell, row) {
    switch (cell) {
      case 1:
        return "⭐";
      case 2:
        return "⭐⭐";
      case 3:
        return "⭐⭐⭐";
      case 4:
        return "⭐⭐⭐⭐";
      case 5:
        return "⭐⭐⭐⭐⭐";
      default:
        return "⭐";
    }
  }

  render() {
    const { isAdmin } = this.props.auth;
    console.log(this.props.reviews);
    if (this.props.location.state == null) {
      return <Redirect to="/manage/products" />;
    }

    const adminView = {
      mode: "radio",
      clickToSelect: true,
      onSelect: row => {
        this.setState({
          currReview: row
        });
      },
      style: { backgroundColor: "#ecf0f1" }
    };

    const userView = {
      mode: "radio",
      hideSelectColumn: true,
      nonSelectable: Array.from(this.props.reviews.keys()),
      style: { backgroundColor: "#ecf0f1" }
    };

    const WarningData = {
      title: "Are you sure?",
      type: "warning",
      footer: ""
    };

    const deleteButton = (
      <span>
        <DeleteAlert
          {...WarningData}
          id={this.state.currReview.id}
          delete={this.props.deleteReview}
        />
      </span>
    );

    const columns = [
      {
        dataField: "author",
        text: "Author",
        searchable: true,
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "rating",
        text: "Rating",
        searchable: true,
        sort: true,
        filter: numberFilter({
          placeholder: "Search..."
        }),
        formatter: this.ratingFormatter,
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "title",
        text: "Title",
        searchable: true,
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "comment",
        text: "Comment",
        searchable: true,
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      }
    ];

    const { title, comment, rating, product } = this.state;
    return (
      <div className="container-fluid" id="product-section">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <img
                src={this.props.location.state.product.picture}
                className="mx-auto d-block image-responsive"
                alt={this.props.location.state.product.name}
                height="600"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h1>
                  <b> {this.props.location.state.product.name} </b>
                </h1>
              </div>

              <div className="card-body">
                <h3 className="pt-2 pb-2">
                  <i> {this.props.location.state.product.brand}</i>
                </h3>

                <h3 className="pt-3 pb-3">
                  ${this.props.location.state.product.price}
                </h3>

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="description-tab"
                      data-toggle="tab"
                      href="#description"
                      role="tab"
                      aria-controls="description"
                      aria-selected="true"
                    >
                      Description
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="documentation-tab"
                      data-toggle="tab"
                      href="#documentation"
                      role="tab"
                      aria-controls="documentation"
                      aria-selected="false"
                    >
                      Download
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="reviews-tab"
                      data-toggle="tab"
                      href="#reviews"
                      role="tab"
                      aria-controls="reviews"
                      aria-selected="false"
                    >
                      Reviews
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="review-tab"
                      data-toggle="tab"
                      href="#review"
                      role="tab"
                      aria-controls="review"
                      aria-selected="false"
                    >
                      Leave Review
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                  >
                    <p className="pb-3 pt-3 pl-3">
                      {this.props.location.state.product.description}
                    </p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="documentation"
                    role="tabpanel"
                    aria-labelledby="documentation-tab"
                  >
                    <p className="pb-3 pt-3 pl-3">
                      Download the picture and documentation for{" "}
                      {this.props.location.state.product.name}
                    </p>
                    <div className="row">
                    <div className="col-md-6">
                      <a
                        href={this.props.location.state.product.documentation}
                        download
                      >
                        <button
                          type="button"
                          className="btn btn-primary btn-block mx-auto center-block"
                        >
                          Download Documentation
                        </button>
                      </a>
                      </div>
                      <div className="col-md-6">
                      <a
                        href={this.props.location.state.product.picture}
                        download
                      >
                        <button
                          type="button"
                          className="btn btn-primary btn-block mx-auto center-block"
                        >
                          Download Picture
                        </button>
                      </a>
                      </div>
                    </div>

                  </div>
                  <div
                    className="tab-pane fade"
                    id="reviews"
                    role="tabpanel"
                    aria-labelledby="reviews-tab"
                  >
                    <div>
                      <ToolkitProvider
                        keyField="id"
                        bootstrap4={true}
                        data={this.props.reviews.filter(
                          r =>
                            r.product === this.props.location.state.product.id
                        )}
                        columns={columns}
                      >
                        {props => (
                          <div>
                            <BootstrapTable
                              bordered={false}
                              hover
                              headerClasses="thead-light"
                              selectRow={
                                this.props.auth.isAdmin ? adminView : userView
                              }
                              filter={filterFactory()}
                              {...props.baseProps}
                            />
                            <div className="btn-group">
                              {this.props.auth.isAdmin ? deleteButton : ""}
                            </div>
                          </div>
                        )}
                      </ToolkitProvider>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="review"
                    role="tabpanel"
                    aria-labelledby="review-tab"
                  >
                    <div className="container">
                      <form onSubmit={this.onSubmit}>
                        <label className="pt-3">Rating</label>
                        <div className="form-group">
                          <select
                            className="mdb-select md-form colorful-select dropdown-primary"
                            onChange={this.onChange}
                            name="rating"
                            value={rating}
                            required
                          >
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Title</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Add review title"
                            onChange={this.onChange}
                            value={title}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Comment</label>
                          <input
                            type="text"
                            className="form-control"
                            name="comment"
                            placeholder="Add your feedback"
                            onChange={this.onChange}
                            value={comment}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Leave Review
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  reviews: state.reviews.reviews
});

export default connect(
  mapStateToProps,
  { getReviews, deleteReview, addReview }
)(ProductPage);
