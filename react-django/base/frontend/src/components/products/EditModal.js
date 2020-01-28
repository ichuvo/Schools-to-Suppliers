import React, { Component } from "react";
import { ModalComponent } from "../layout/ModalComponent";
import { connect } from "react-redux";

import { updateProduct } from "../../actions/products";
import Button from "react-bootstrap/Button";
import { Typeahead } from "react-bootstrap-typeahead";

import PropTypes from "prop-types";

//This should look very similar to the accounts -> register.js

export class EditModal extends Component {
  static propTypes = {
    exists: PropTypes.bool.isRequired,
    product: PropTypes.object.isRequired,
    updateProduct: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    type: PropTypes.array.isRequired
  };

  state = {
    id: "",
    name: "",
    description: "",
    category: "",
    subcategory: "",
    type: [],
    price: "",
    brand: "",
    quantity: "",
    picture: "",
    documentation: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onChangeFile = e => {
    if (e.target.name === "picture") {
      this.setState({ picture: e.target.files[0] });
    } else {
      this.setState({ documentation: e.target.files[0] });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.product !== null &&
        Object.keys(this.props.product).length !== 0
      ) {
        this.setState({
          id: this.props.product.id,
          name: this.props.product.name,
          description: this.props.product.description,
          category: this.props.product.category.id,
          subcategory:
            typeof this.props.product.subcategory === "undefined" ||
            this.props.product.subcategory === "" ||
            this.props.product.subcategory === null
              ? ""
              : this.props.product.subcategory.id,
          type: this.props.product.type,
          price: this.props.product.price,
          brand: this.props.product.brand,
          quantity: this.props.product.quantity,
          picture: this.props.product.picture,
          documentation: this.props.product.documentation
        });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const {
      id,
      name,
      description,
      category,
      subcategory,
      type,
      price,
      brand,
      quantity,
      picture,
      documentation
    } = this.state;
    const product = {
      name,
      description,
      category,
      subcategory,
      type,
      price,
      brand,
      quantity,
      picture,
      documentation
    };

    let form_data = new FormData();
    form_data.append("name", this.state.name);
    form_data.append("description", this.state.description);
    form_data.append("category", this.state.category);
    form_data.append("subcategory", this.state.subcategory);
    var result = ``;
    for (var i = 0; i < this.state.type.length; i++) {
      if (this.state.type[i] !== undefined) {
        result = result.concat(this.state.type[i].name, `, `);
      }
    }
    form_data.append("type", result.substring(0, result.length - 2));
    form_data.append("picture", this.state.picture);
    form_data.append("documentation", this.state.documentation);
    form_data.append("price", this.state.price);
    form_data.append("brand", this.state.brand);
    form_data.append("quantity", this.state.quantity);
    this.props.updateProduct(id, form_data);
  };

  render() {
    return (
      <ModalComponent
        title={"Edit product details"}
        button="Edit"
        exists={this.props.exists}
        prev={this.props.prev}
        curr={this.props.curr}
        body={
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter name"
                onChange={this.onChange}
                value={this.state.name}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Enter description"
                onChange={this.onChange}
                value={this.state.description}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <Typeahead
                id="test2"
                placeholder="Choose category..."
                onChange={selected => {
                  this.setState({
                    category: selected[0] ? selected[0].id : "",
                    subcategory: null
                  });
                  this.props.product.subcategory = null;
                  this.typeahead2.clear();
                }}
                labelKey="name"
                options={this.props.categories}
                ref={typeahead => (this.typeahead1 = typeahead)}
                defaultSelected={
                  this.props.product.category
                    ? [this.props.product.category]
                    : []
                }
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
                    subcategory: selected[0] ? selected[0].id : ""
                  });
                }}
                labelKey="name"
                emptyLabel={
                  this.state.category === ""
                    ? "Please select a parent category."
                    : "No matches found."
                }
                options={
                  Object.keys(this.props.categories).length == 0 ||
                  this.state.category === "" ||
                  typeof this.props.categories === "undefined" ||
                  Object.keys(
                    this.props.categories.filter(
                      c => c.id === this.state.category
                    )
                  ).length == 0
                    ? []
                    : this.props.categories.filter(
                        c => c.id === this.state.category
                      )[0].subcategories
                }
                ref={typeahead => (this.typeahead2 = typeahead)}
                defaultSelected={
                  this.props.product.subcategory
                    ? [this.props.product.subcategory]
                    : []
                }
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <Typeahead
                id="test2"
                placeholder="Choose type..."
                onChange={selected => {
                  let types = [];
                  selected.map(selection => {
                    types.push(selection);
                  });
                  this.setState({
                    type: types
                  });
                }}
                labelKey="name"
                options={this.props.type}
                multiple={true}
                defaultSelected={this.state.type}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                min="0.00"
                max="1000000.00"
                step="0.01"
                className="form-control"
                name="price"
                placeholder="Enter Price"
                onChange={this.onChange}
                value={this.state.price}
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
                value={this.state.brand}
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                placeholder="Enter quantity"
                onChange={this.onChange}
                value={this.state.quantity}
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
  { updateProduct }
)(EditModal);
