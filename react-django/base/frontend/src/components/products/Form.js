import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../../store";

import { Typeahead } from "react-bootstrap-typeahead";

import { addProduct } from "../../actions/products";
import { getCategories } from "../../actions/categories";
import { createMessage, returnErrors } from "../../actions/messages";

export class Form extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: "",
    description: "",
    category: "",
    subcategory: "",
    type: "",
    picture: "",
    documentation: "",
    price: "",
    brand: "",
    quantity: "",
    categories: [],
    selectedCat: []
  };

  static propTypes = {
    addProduct: PropTypes.func.isRequired,
    types: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.categories !== null &&
      Object.keys(this.props.categories).length !== 0 &&
      this.state.categories.length == 0
    ) {
      this.setState({
        categories: this.props.categories
      });
    }
  }

  /* TO DO:
   *  - Fix the image field to only accept image files

   The map() method creates a new array with the results of calling a function for every array element. T
   he map() method calls the provided function once for each element in an array, in order.
    Note: map() does not execute the function for array elements without values.
   */
  // e anyevent
  onChange = e => {
    switch (e.target.name) {
      case "quantity":
        if (e.target.value % 1 != 0) {
          store.dispatch(
            createMessage({ wrongInput: "Quantity must be whole number" })
          );
        } else {
          this.setState({ [e.target.name]: e.target.value });
        }
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  }; // this is where we update the state onChange

  onChangeFile = e => {
    if (e.target.name === "picture") {
      this.setState({ picture: e.target.files[0] });
    } else {
      this.setState({ documentation: e.target.files[0] });
    }
  };

  onSubmit = e => {
    e.preventDefault(); // ? what is this used for ?
    // https://www.google.com/search?q=react+e.preventdefault()

    // How is the mapping of values is done here?
    // It's variable assignment.

    if (this.state.category === "") {
      store.dispatch(
        createMessage({
          wrongInput: "Select a valid Category or click add"
        })
      );
      return;
    }

    if (this.state.type === "") {
      store.dispatch(
        createMessage({
          wrongInput: "Select a valid Type or click add"
        })
      );
      return;
    }

    let form_data = new FormData();
    form_data.append("name", this.state.name);
    form_data.append("description", this.state.description);
    form_data.append("category", this.state.category);
    form_data.append("subcategory", this.state.subcategory);
    form_data.append("type", this.state.type);
    form_data.append("picture", this.state.picture);
    form_data.append("documentation", this.state.documentation);
    form_data.append("price", this.state.price);
    form_data.append("brand", this.state.brand);
    form_data.append("quantity", this.state.quantity);

    this.props.addProduct(form_data);

    this.setState({
      name: "",
      description: "",
      category: "",
      subcategory: "",
      type: "",
      picture: "",
      documentation: "",
      price: "",
      brand: "",
      quantity: ""
    });
    this.typeahead1.clear();
    this.typeahead2.clear();
  };

  render() {
    const {
      name,
      description,
      category,
      subcategory,
      type,
      picture,
      documentation,
      price,
      brand,
      quantity
    } = this.state;
    return (
      <div className="card mb-3">
        <h3 className="card-header">Create Product</h3>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Product name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter product name"
                onChange={this.onChange}
                value={name}
                required
              />
            </div>
            <div className="form-group">
              <label>Product description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Enter product description"
                onChange={this.onChange}
                value={description}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <Typeahead
                id="test2"
                placeholder="Choose category..."
                onChange={selected => {
                  this.setState({
                    category: selected[0] ? selected[0].name : ""
                  });
                }}
                labelKey="name"
                options={this.props.categories}
                ref={typeahead => (this.typeahead1 = typeahead)}
                allowNew
                newSelectionPrefix="Add new category: "
              />
            </div>
            <div className="form-group">
              <label>Subcategory</label>
              <Typeahead
                id="test2"
                disabled={this.state.category === "" ? true : false}
                placeholder={
                  this.state.category === ""
                    ? "Please select a parent category first"
                    : "Choose subcategory..."
                }
                onChange={selected => {
                  this.setState({
                    subcategory: selected[0] ? selected[0].name : ""
                  });
                }}
                labelKey="name"
                emptyLabel={
                  this.state.category === ""
                    ? "Please select a parent category."
                    : "No matches found."
                }
                options={
                  Object.keys(this.state.categories).length == 0 ||
                  this.state.category === "" ||
                  typeof this.state.categories === "undefined" ||
                  Object.keys(
                    this.state.categories.filter(
                      c => c.name === this.state.category
                    )
                  ).length == 0 ||
                  Object.keys(
                    this.state.categories.filter(
                      c => c.name === this.state.category
                    )[0].subcategories
                  ).length == 0
                    ? []
                    : this.state.categories.filter(
                        c => c.name === this.state.category
                      )[0].subcategories
                }
                ref={typeahead => (this.typeahead1 = typeahead)}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <Typeahead
                id="test2"
                placeholder="Choose type..."
                onChange={selected => {
                  let types = [];
                  selected.map(selection => types.push(selection.name));
                  this.setState({
                    type: types
                  });
                }}
                labelKey="name"
                multiple={true}
                options={this.props.types}
                ref={typeahead => (this.typeahead2 = typeahead)}
                allowNew
                newSelectionPrefix="Add new type: "
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                min="0.00"
                max="9999.99"
                step="0.01"
                className="form-control"
                name="price"
                placeholder="Enter Price"
                onChange={this.onChange}
                value={price}
                required
              />
            </div>
            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                className="form-control"
                name="brand"
                placeholder="Enter brand"
                onChange={this.onChange}
                value={brand}
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                step="1.0"
                className="form-control"
                name="quantity"
                placeholder="Enter quantity"
                onChange={this.onChange}
                value={quantity}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Picture</label>
              <input
                type="file"
                accept="image/*"
                className="form-control-file"
                name="picture"
                placeholder="Upload picture image"
                onChange={this.onChangeFile}
              />
            </div>
            <div className="form-group">
              <label>Documentation</label>
              <input
                type="file"
                accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                className="form-control-file"
                name="documentation"
                placeholder="Upload product documentation"
                onChange={this.onChangeFile}
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
  { addProduct, getCategories }
)(Form);
