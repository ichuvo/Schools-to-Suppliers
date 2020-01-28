import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addAllocation } from "../../actions/allocations";
import { Typeahead } from "react-bootstrap-typeahead";
import { createMessage, returnErrors } from "../../actions/messages";
import store from "../../store";

export class Form extends Component {
  state = {
    user: "",
    product: "",
    quantity: "",
    group: "",
    message: ""
  };

  static propTypes = {
    users: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmitUser = e => {
    e.preventDefault();
    const { user, product, quantity, message } = this.state;
    if (user === "" && product === "") {
      store.dispatch(
        createMessage({
          wrongInput: "Please select a user and a product"
        })
      );
    } else if (user === "" && product !== "") {
      store.dispatch(
        createMessage({
          wrongInput: "Please select a user"
        })
      );
    } else if (user !== "" && product === "") {
      store.dispatch(
        createMessage({
          wrongInput: "Please select a product"
        })
      );
    } else if (this.props.users.filter(u => u.id === user).length == 0) {
      store.dispatch(
        createMessage({
          wrongInput: "User does not exist"
        })
      );
    } else {
      const allocation = {
        user,
        product,
        quantity,
        message,
        type: 0
      };

      this.props.addAllocation(allocation);
      this.setState({
        user: "",
        product: "",
        quantity: "",
        message: ""
      });
      this.typeahead1.clear();
      this.typeahead2.clear();
    }
  };

  onSubmitGroup = e => {
    e.preventDefault();
    const { group, product, quantity, message } = this.state;

    if (group === "" && product === "") {
      store.dispatch(
        createMessage({
          wrongInput: "Please select a group and a product"
        })
      );
    } else if (group === "" && product !== "") {
      store.dispatch(
        createMessage({
          wrongInput: "Please select a group"
        })
      );
    } else if (group !== "" && product === "") {
      store.dispatch(
        createMessage({
          wrongInput: "Please select a product"
        })
      );
    } else if (this.props.groups.filter(u => u.id === group).length == 0) {
      store.dispatch(
        createMessage({
          wrongInput: "Group does not exist"
        })
      );
    } else {
      const allocation = {
        group,
        product,
        quantity,
        message,
        type: 1
      };

      this.props.addAllocation(allocation);
      this.setState({
        group: "",
        product: "",
        quantity: "",
        message: ""
      });
      this.typeahead3.clear();
      this.typeahead4.clear();
    }
  };

  render() {
    const { quantity } = this.state;
    const { message } = this.state;
    return (
      <div>
        <div className="card mb-3">
          <h3 className="card-header">Create Allocation</h3>
          <div className="card-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  data-toggle="tab"
                  className="nav-link active"
                  id="user-tab"
                  aria-controls="user"
                  aria-selected="true"
                  href="#UserAllocate"
                  role="tab"
                >
                  Allocate on User
                </a>
              </li>
              <li>
                <a
                  data-toggle="tab"
                  className="nav-link"
                  id="group-tab"
                  aria-controls="group"
                  aria-selected="false"
                  href="#GroupAllocate"
                  role="tab"
                >
                  Allocate on Group
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                id="UserAllocate"
                className="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="user-tab"
              >
                <div className="container">
                  <form onSubmit={this.onSubmitUser}>
                    <div className="form-group">
                      <label>User </label>
                      <Typeahead
                        id="test2"
                        placeholder="Choose user..."
                        onChange={selected => {
                          this.setState({
                            user: selected[0] ? selected[0].id : ""
                          });
                        }}
                        labelKey={option =>
                          `${option.institute}: ${option.email}`
                        }
                        options={this.props.users}
                        ref={typeahead => (this.typeahead1 = typeahead)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Product</label>
                      <Typeahead
                        id="test2"
                        placeholder="Choose product..."
                        onChange={selected => {
                          let products = [];
                          selected.map(selection =>
                            products.push(selection.id)
                          );
                          this.setState({
                            product: products
                          });
                        }}
                        labelKey={option =>
                          `${option.name}: ${option.description}`
                        }
                        multiple={true}
                        options={this.props.products}
                        ref={typeahead => (this.typeahead2 = typeahead)}
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
                        min="1"
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
                        value={message}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>

              <div
                id="GroupAllocate"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="group-tab"
              >
                <div className="container">
                  <form onSubmit={this.onSubmitGroup}>
                    <div className="form-group">
                      <label>Group </label>
                      <Typeahead
                        id="test3"
                        placeholder="Choose group..."
                        onChange={selected => {
                          this.setState({
                            group: selected[0] ? selected[0].id : ""
                          });
                        }}
                        labelKey={option => `${option.name}`}
                        options={this.props.groups}
                        ref={typeahead => (this.typeahead3 = typeahead)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Product</label>
                      <Typeahead
                        id="test4"
                        placeholder="Choose product..."
                        onChange={selected => {
                          let products = [];
                          selected.map(selection =>
                            products.push(selection.id)
                          );
                          this.setState({
                            product: products
                          });
                        }}
                        labelKey={option =>
                          `${option.name}: ${option.description}`
                        }
                        multiple={true}
                        options={this.props.products}
                        ref={typeahead => (this.typeahead4 = typeahead)}
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
                        value={message}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addAllocation }
)(Form);
