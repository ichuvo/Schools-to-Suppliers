import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

// LINK IS VERY IMPORTANT FOR THE SPA TO WORK PLS PLS DON'T FORGET IT OR YOU'LL 404
// - Alex

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const style = {
      color: "#18BC9C"
    };

    const adminLinks = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Institutions
            </a>
            <div
              className="dropdown-menu dropdown-primary"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link to="/manage/users" className="dropdown-item" style={style}>
                View Institutions
              </Link>
              <Link to="/manage/groups" className="dropdown-item" style={style}>
                Groups
              </Link>
            </div>
          </li>
          '
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Products
            </a>
            <div
              className="dropdown-menu dropdown-primary"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link
                to="/manage/products"
                className="dropdown-item"
                style={style}
              >
                Product List
              </Link>
              <Link
                to="/manage/categories"
                className="dropdown-item"
                style={style}
              >
                Categories
              </Link>
              <Link to="/manage/types" className="dropdown-item" style={style}>
                Types
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Allocations
            </a>
            <div
              className="dropdown-menu dropdown-primary"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link
                to="/manage/allocations"
                className="dropdown-item"
                style={style}
              >
                View Allocations
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/manage/adminhelp" className="nav-link">
              Help
            </Link>
          </li>
        </ul>
      </div>
    );

    const insituteLinks = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Profile
            </a>
            <div
              className="dropdown-menu dropdown-primary"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link
                to="/manage/myaccount"
                className="dropdown-item"
                style={style}
              >
                My Account
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Products
            </a>
            <div
              className="dropdown-menu dropdown-primary"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link
                to="/manage/products"
                className="dropdown-item"
                style={style}
              >
                Product List
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Allocations
            </a>
            <div
              className="dropdown-menu dropdown-primary"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link
                to="/manage/allocations"
                className="dropdown-item"
                style={style}
              >
                View Allocations
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/manage/institutehelp" className="nav-link">
              Help
            </Link>
          </li>
        </ul>
      </div>
    );

    const authLinks = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {this.props.auth.isAdmin ? adminLinks : insituteLinks}
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.email}` : ""}</strong>
        </span>
        <button
          className="nav-item"
          onClick={this.props.logout}
          className="nav-link btn btn-light btn-sm"
        >
          Logout
        </button>
      </div>
    );

    const guestLinks = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </div>
        <div className="navbar-nav">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </div>
        <div className="navbar-nav">
          <Link to="/manage/guesthelp" className="nav-link">
            Help
          </Link>
        </div>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {isAuthenticated ? authLinks : guestLinks}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
