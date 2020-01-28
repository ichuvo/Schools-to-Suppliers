import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import filterFactory, {
  textFilter,
  numberFilter
} from "react-bootstrap-table2-filter";

import HeaderFormatter from "../layout/HeaderFormatter";
import EditModal from "./EditModal";
import DeleteAlert from "../layout/DeleteAlert";

import {
  getAllocations,
  deleteAllocation,
  updateAllocation
} from "../../actions/allocations";

export class Allocations extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    allocations: PropTypes.array.isRequired,
    getAllocations: PropTypes.func.isRequired,
    deleteAllocation: PropTypes.func.isRequired
  };

  state = {
    selected: [],
    currAllocation: {},
    prevAllocation: {}
  };

  //Adds products into a comma separated string
  productsFormatter(cell, row) {
    if (typeof cell === "undefined") {
      return "None";
    }
    if (cell[0] !== undefined) {
      var result = ``;
      for (var i = 0; i < cell.length; i++) {
        if (cell[i].name !== undefined) {
          result = result.concat(cell[i].name, `, `);
        }
      }
      return result.substring(0, result.length - 2);
    } else {
      return "None";
    }
  }

  componentDidMount() {
    this.props.getAllocations();
  }

  componentDidUpdate(prevProps) {
    // this.state.prevAllocation = this.state.currAllocation;
  }

  onDelete() {
    this.state.prevAllocation.id = this.state.currAllocation.id;
    this.state.currAllocation = {};
  }
  render() {
    const { isAdmin } = this.props.auth;
    const { ExportCSVButton } = CSVExport;
    const columns = [
      { dataField: "id", text: "id", sort: true },
      {
        dataField: "user.institute",
        text: "Institute",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "user.email",
        text: "Email",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "products",
        text: "Product",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        formatter: this.productsFormatter,
        headerFormatter: HeaderFormatter,
        csvFormatter: this.productsFormatter,
        filterValue: this.productsFormatter
      },
      {
        dataField: "quantity",
        text: "Quantity",
        sort: true,
        filter: numberFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "message",
        text: "Message",
        searchable: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "created_at",
        text: "Allocation Date",
        searchable: false,
        sort: true
      }
    ];

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      onSelect: row => {
        this.setState({
          currAllocation: row
        });
      },
      style: { backgroundColor: "#ecf0f1" }
    };

    const selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: (row, isSelect) => {
        if (isSelect) {
          this.setState({
            selected: [...this.state.selected, row.id]
          });
        } else {
          this.setState({
            selected: this.state.selected.filter(x => x !== row.id)
          });
        }
        if (this.state.selected.length === 1) {
          this.setState({
            currAllocation: this.props.allocations.map(allocation => {
              if (allocation.id === this.state.selected[0]) {
                return allocation;
              }
            })
          });
        } else {
          this.setState({
            currAllocation: []
          });
        }
      },
      style: { backgroundColor: "#ecf0f1" }
    };

    const WarningData = {
      title: "Are you sure?",
      type: "warning",
      footer: ""
    };

    const viewLink = (
      <button className="btn btn-link">
        <Link
          to={{
            pathname: "/manage/allocations/allocationpage",
            state: {
              allocation: this.state.currAllocation
            }
          }}
        >
          View
        </Link>
      </button>
    );

    const disabledLink = (
      <button className="btn btn-link disabled">
        <Link
          to={{
            pathname: "/manage/allocations/allocationpage",
            state: {
              allocation: this.state.currAllocation
            }
          }}
        >
          View
        </Link>
      </button>
    );

    const adminView = (
      <span>
        <EditModal
          exists={
            !(this.state.currAllocation.id === this.state.prevAllocation.id) &&
            !(typeof this.state.currAllocation.id === "undefined")
          }
          allocation={this.state.currAllocation}
          updateAllocation={this.props.updateAllocation}
          users={this.props.users}
          products={this.props.products}
        />
        <DeleteAlert
          {...WarningData}
          id={this.state.currAllocation.id}
          delete={this.props.deleteAllocation}
          onDelete={this.onDelete}
        />
      </span>
    );

    const userView = <span></span>;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Allocations</h2>
        <div>
          <ToolkitProvider
            keyField="id"
            data={this.props.allocations}
            columns={columns}
            exportCSV={{
              fileName:
                "Allocations_" +
                new Date()
                  .toDateString()
                  .split(" ")
                  .join("_") +
                ":" +
                new Date().getHours() +
                ":" +
                new Date().getMinutes() +
                ":" +
                new Date().getSeconds() +
                " .csv"
            }}
            bootstrap4
          >
            {props => (
              <div>
                <BootstrapTable
                  hover
                  bordered={false}
                  data={this.props.allocations}
                  headerClasses="thead-light"
                  loading={true}
                  selectRow={selectRow}
                  ref={n => (this.table = n)}
                  filter={filterFactory()}
                  {...props.baseProps}
                />
                <div className="btn-group">
                  {this.state.currAllocation.id ===
                    this.state.prevAllocation.id ||
                  typeof this.state.currAllocation.id === "undefined"
                    ? disabledLink
                    : viewLink}
                  {}
                  {this.props.auth.isAdmin ? adminView : userView}
                  <ExportCSVButton {...props.csvProps} className="btn-link">
                    Export CSV
                  </ExportCSVButton>
                </div>
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  allocations: state.allocations.allocations
});

export default connect(
  mapStateToProps,
  { getAllocations, deleteAllocation, updateAllocation }
)(Allocations);
