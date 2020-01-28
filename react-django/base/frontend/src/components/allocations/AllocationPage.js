import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";

import filterFactory, {
  textFilter,
  numberFilter
} from "react-bootstrap-table2-filter";
import HeaderFormatter from "../layout/HeaderFormatter";

export class AllocationPage extends Component {
  state = {
    currAllocation: {}
  };

  render() {
    this.props.location.state.allocation.products.map(product => {
      product.quantity = this.props.location.state.allocation.quantity;
      return { ...product };
    });

    const columns = [
      {
        dataField: "name",
        text: "Product",
        searchable: true,
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "description",
        text: "Description",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "quantity",
        text: "Quantity",
        sort: true,
        searchable: false,
        filter: numberFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "price",
        text: "Unit Price",
        sort: true,
        searchable: false,
        filter: numberFilter({
          placeholder: "Search..."
        }),
        formatter: cell => {
          return "$".concat(cell, "");
        },
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "df1",
        isDummyField: true,
        text: "Total Price",
        formatter: (cell, row) => {
          return "$".concat((row.quantity * (row.price * 10) / 10).toFixed(2), "");
        }
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

    const { ExportCSVButton } = CSVExport;

    if (this.props.location.state == null) {
      return <Redirect to="/manage/allocations" />;
    }

    const viewLink = (
      <button className="btn btn-link">
        <Link
          to={{
            pathname: "/manage/products/productpage",
            state: {
              product: this.state.currAllocation
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
            pathname: "/manage/products/productpage",
            state: {
              product: this.state.currAllocation
            }
          }}
        >
          View
        </Link>
      </button>
    );

    function totalPrice(productsArray) {
      var total = 0;
      for (var i = 0; i < productsArray.length; i++) {
        total += ((productsArray[i].price * 10) * productsArray[i].quantity) / 10;
      }
      return total;
    }

    const showMessage = (
      <h4>
        {" "}
        Message from admin:
        <span> {this.props.location.state.allocation.message} </span>{" "}
      </h4>
    );

    return (
      <div className="container-fluid" id="allocation-section">
        <div className="card card-body mt-4 mb-4">
          <h2> Allocation {this.props.location.state.allocation.id}</h2>
          {this.props.location.state.allocation.message === null ||
          this.props.location.state.allocation.message === "" ? (
            <p></p>
          ) : (
            showMessage
          )}
          <div>
            <ToolkitProvider
              keyField="id"
              bootstrap4={true}
              data={this.props.location.state.allocation.products}
              columns={columns}
              exportCSV={{
                fileName:
                  "Allocation" +
                  this.props.location.state.allocation.id +
                  "_" +
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

                  <div align="right">
                    <p>
                      <b>Total Price:</b> $
                      {totalPrice(
                        this.props.location.state.allocation.products
                      ).toFixed(2)}
                    </p>
                  </div>

                  <div className="btn-group">
                    {typeof this.state.currAllocation.id === "undefined"
                      ? disabledLink
                      : viewLink}
                    <ExportCSVButton {...props.csvProps} className="btn-link">
                      Export CSV
                    </ExportCSVButton>
                    <button className="btn btn-link">
                      <Link
                        to={{
                          pathname: "/manage/allocations"
                        }}
                      >
                        Back to Allocations
                      </Link>
                    </button>
                  </div>
                </div>
              )}
            </ToolkitProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default AllocationPage;
