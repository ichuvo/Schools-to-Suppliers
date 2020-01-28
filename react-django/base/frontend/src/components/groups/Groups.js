import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import BootstrapTable from "react-bootstrap-table-next";
import HeaderFormatter from "../layout/HeaderFormatter";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import { getGroups, deleteGroup, updateGroup } from "../../actions/groups";
import EditModal from "./EditModal";
import DeleteAlert from "../layout/DeleteAlert";

/*
Only Admins need to see this page
*/

export class Groups extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getGroups();
  }

  componentDidUpdate(prevProps) {}

  state = {
    currGroup: {},
    prevGroup: {}
  };

  onDelete() {
    this.state.prevGroup.id = this.state.currGroup.id;
    this.state.currGroup = {};
  }

  render() {
    const WarningData = {
      title: "Are you sure?",
      type: "warning",
      footer: ""
    };

    const columns = [
      { dataField: "id", text: "id", sort: true },
      {
        dataField: "name",
        text: "Group Name",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerformatter: HeaderFormatter
      }
    ];

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      onSelect: row => {
        this.setState({
          currGroup: row
        });
      },
      style: { backgroundColor: "#ecf0f1" }
    };

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Groups</h2>
        <div>
          <BootstrapTable
            keyField="id"
            data={this.props.groups}
            columns={columns}
            bootstrap4
            hover
            bordered={false}
            headerClasses="thead-light"
            selectRow={selectRow}
            filter={filterFactory()}
          />
          <div className="btn-group">
            <EditModal
              exists={!(typeof this.state.currGroup.id == "undefined")}
              group={this.state.currGroup}
              updateGroup={this.props.updateGroup}
            />
            <DeleteAlert
              {...WarningData}
              id={this.state.currGroup.id}
              delete={this.props.deleteGroup}
              onDelete={this.onDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups.groups
});

export default connect(
  mapStateToProps,
  { getGroups, updateGroup, deleteGroup }
)(Groups);
