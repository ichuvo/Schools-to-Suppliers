import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Form from "./Form";
import Users from "./Users";

import { getGroups } from "../../actions/groups";

export class UserDashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getGroups();
  }

  render() {
    const { isAdmin } = this.props.auth;
    return (
      <div>
        <div>
          <Users groups={this.props.groups} />
        </div>
        <div className="container">
          {isAdmin ? <Form groups={this.props.groups} /> : ""}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  groups: state.groups.groups
});

export default connect(
  mapStateToProps,
  { getGroups }
)(UserDashboard);
