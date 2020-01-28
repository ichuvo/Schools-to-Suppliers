import React, { Component } from "react";
import store from "../../store";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import HeaderFormatter from "../layout/HeaderFormatter";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import { getUsers, deleteUser, updateUser } from "../../actions/users";
import { resetPassword } from "../../actions/auth";
import EditModal from "./EditModal";
import DeleteAlert from "../layout/DeleteAlert";

import { createMessage, returnErrors } from "../../actions/messages";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  //Properties
  static propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
    resetPassword: PropTypes.func.isRequired
  };

  state = {
    id: "",
    email: "",
    institute: "",
    contact_number: "",
    institute_size: "",
    address: "",
    suburb: "",
    postcode: "",
    currUser: {},
    prevUser: {}
  };

  componentDidMount() {
    this.props.getUsers();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.groups[0] != null) {
        this.state.group = this.props.groups[0].id;
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const email = this.state.currUser.email;
    if (typeof this.state.currUser.id !== "undefined") {
      this.props.resetPassword(email);
    } else {
      store.dispatch(
        createMessage({
          wrongInput: "No user selected"
        })
      );
    }
  };

  onDelete() {
    this.state.prevUser.id = this.state.currUser.id;
    this.state.currUser = {};
  }

  render() {
    const columns = [
      {
        dataField: "id",
        text: "ID",
        searchable: false,
        sort: true,
        headerStyle: () => {
          return { width: "60px" };
        }
      },
      {
        dataField: "email",
        text: "Email",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "institute",
        text: "Institute",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "contact_number",
        text: "Contact Number",
        searchable: false,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "institute_size",
        text: "Institute Size",
        searchable: false,
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "address",
        text: "Address",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "group.name",
        text: "Group",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "suburb",
        text: "Suburb",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "postcode",
        text: "Postcode",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "created_at",
        text: "Registration Date",
        searchable: false,
        sort: true
      },
      { dataField: "is_admin", text: "Admin", sort: true }
    ];
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      onSelect: row => {
        this.setState({
          currUser: row
        });
      },
      style: { backgroundColor: "#ecf0f1" }
    };
    const WarningData = {
      title: "Are you sure?",
      type: "warning",
      footer: ""
    };
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Users</h2>
        <div>
          <ToolkitProvider
            keyField="id"
            bootstrap4={true}
            data={this.props.users}
            columns={columns}
          >
            {props => (
              <div>
                <BootstrapTable
                  bordered={false}
                  hover
                  headerClasses="thead-light"
                  selectRow={selectRow}
                  filter={filterFactory()}
                  {...props.baseProps}
                />
                <div className="btn-group">
                  <EditModal
                    exists={!(typeof this.state.currUser.id === "undefined")}
                    user={this.state.currUser}
                    updateUser={this.props.updateUser}
                    groups={this.props.groups}
                  />
                  <DeleteAlert
                    {...WarningData}
                    id={this.state.currUser.id}
                    delete={this.props.deleteUser}
                    onDelete={this.onDelete}
                  />
                  <form onSubmit={this.onSubmit}>
                    <button className="btn btn-link">Reset password</button>
                  </form>
                </div>
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    );
  }
}

//Takes a state of redux to props of the component
const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users.users
});

export default connect(
  mapStateToProps,
  { getUsers, deleteUser, updateUser, resetPassword }
)(Users);
