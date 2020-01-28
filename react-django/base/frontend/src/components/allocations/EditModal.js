import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";

import { Typeahead } from "react-bootstrap-typeahead";
import { ModalComponent } from "../layout/ModalComponent";

export class EditModal extends Component {
  static propTypes = {
    exists: PropTypes.bool.isRequired,
    allocation: PropTypes.object.isRequired,
    updateAllocation: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired
  };

  state = {
    id: "",
    user: "",
    products: [],
    quantity: "",
    message: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.allocation !== null &&
        Object.keys(this.props.allocation).length !== 0
      ) {
        this.setState({
          id: this.props.allocation.id,
          user: this.props.allocation.user,
          products: this.props.allocation.products,
          quantity: this.props.allocation.quantity,
          message: this.props.allocation.message
            ? this.props.allocation.message
            : ""
        });
      }
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    let { id, user, products, quantity, message } = this.state;
    user = user.id;
    const allocation = { user, products, quantity, message };
    this.props.updateAllocation(id, allocation);
  };

  render() {
    const { quantity } = this.state;
    return (
      <ModalComponent
        title={"Edit allocation details"}
        button="Edit"
        exists={this.props.exists}
        body={
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>User</label>
              <Typeahead
                id="test2"
                placeholder="Choose user..."
                onChange={selected => {
                  this.setState({
                    user: selected[0] ? selected[0].id : ""
                  });
                }}
                labelKey="email"
                options={this.props.users}
                defaultSelected={[this.state.user]}
              />
            </div>
            <div className="form-group">
              <label>Product</label>
              <Typeahead
                id="test2"
                placeholder="Choose product..."
                onChange={selected => {
                  let products = [];
                  selected.map(selection => products.push(selection.id));
                  this.setState({
                    products: products
                  });
                }}
                labelKey="name"
                options={this.props.products}
                multiple={true}
                defaultSelected={this.state.products}
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
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <input
                type="text"
                className="form-control"
                name="message"
                placeholder="Enter message"
                onChange={this.onChange}
                value={this.state.message}
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

export default EditModal;
