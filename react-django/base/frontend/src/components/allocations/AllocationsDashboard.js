import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Allocations from "./Allocations";
import Form from "./Form";

import { getUsers } from "../../actions/users";
import { getProducts } from "../../actions/products";
import { getGroups } from "../../actions/groups";


export class AllocationsDashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getProducts();
    this.props.getUsers();
    this.props.getGroups();
  }

  render() {
    const { isAdmin } = this.props.auth;
    return (
      <div className="container">
        <Allocations users={this.props.users} products={this.props.products} />
        {isAdmin ? (
          <Form users={this.props.users} products={this.props.products} groups={this.props.groups}/>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products.products,
  users: state.users.users,
  groups: state.groups.groups
});

export default connect(
  mapStateToProps,
  { getProducts, getUsers, getGroups }
)(AllocationsDashboard);
