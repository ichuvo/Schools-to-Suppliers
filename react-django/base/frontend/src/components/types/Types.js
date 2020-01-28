import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import HeaderFormatter from "../layout/HeaderFormatter";

import { getTypes, deleteType, updateType } from "../../actions/pTypes";
import EditModal from "./EditModal";
import DeleteAlert from "../layout/DeleteAlert";

/*
Only Admins need to see this page
*/

export class Types extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  static propTypes = {
    types: PropTypes.array.isRequired,
    getTypes: PropTypes.func.isRequired,
    deleteType: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getTypes();
  }

  componentDidUpdate(prevProps) {
    //this.state.prevType = this.state.currType;
  }

  state = {
    currType: {},
    prevType: {}
  };

  onDelete() {
    this.state.prevType.id = this.state.currType.id;
    this.state.currType = {};
  }

  render() {
    const WarningData = {
      title: "Are you sure?",
      type: "warning",
      footer: ""
    };

    const columns = [
      { dataField: "id", text: "ID" },
      {
        dataField: "name",
        text: "Name",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      }
    ];

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      onSelect: row => {
        this.setState({
          currType: row
        });
      },
      style: { backgroundColor: "#ecf0f1" }
    };

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Types</h2>
        <div>
          <BootstrapTable
            keyField="id"
            data={this.props.types}
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
              exists={!(typeof this.state.currType.id === "undefined")}
              type={this.state.currType}
              updateType={this.props.updateType}
            />
            <DeleteAlert
              {...WarningData}
              id={this.state.currType.id}
              delete={this.props.deleteType}
              onDelete={this.onDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  types: state.types.types
});

export default connect(
  mapStateToProps,
  { getTypes, deleteType, updateType }
)(Types);
