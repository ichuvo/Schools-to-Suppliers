import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import {
  getProducts,
  deleteProduct,
  updateProduct
} from "../../actions/products";
import filterFactory, {
  textFilter,
  numberFilter
} from "react-bootstrap-table2-filter";
import HeaderFormatter from "../layout/HeaderFormatter";

import DeleteAlert from "../layout/DeleteAlert";
import EditModal from "./EditModal";
import CSVUploadModal from "./CSVUploadModal";
/*
Some things TODO here
Admins need to be able to see all products
Institutes needs to see only THEIR products
Therefore can't actually use the global state for products in the same way as users
- Alex
*/

export class Products extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    types: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
  };

  state = {
    name: "",
    description: "",
    category: "",
    subcategory: "",
    type: "",
    picture: "",
    documentation: "",
    price: "",
    brand: "",
    quantity: "",
    deleted: [],
    currProduct: {}
  };

  componentDidMount() {
    this.props.getProducts();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.categories[0] != null && this.props.types[0] != null) {
        this.state.category = this.props.categories[0].id;
        this.state.type = this.props.types[0].id;
      }
      if (this.props.products !== prevProps.products) {
        this.props.products.map(product => {
          if (product.id === this.state.currProduct.id) {
            this.setState({
              currProduct: product
            });
          }
          return { ...product };
        });
      }
    }
  }

  onDelete() {
    this.state.deleted.push(this.state.currProduct.id);
    this.state.currProduct = {};
  }

  typesFormatter(cell, row) {
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

  render() {
    const { isAdmin } = this.props.auth;
    const { ExportCSVButton } = CSVExport;
    const adminColumns = [
      {
        dataField: "id",
        text: "ID",
        searchable: false,
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "name",
        text: "Name",
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
        dataField: "category.name",
        text: "Category",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "subcategory.name",
        text: "Subcategory",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "type",
        text: "Type",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        formatter: this.typesFormatter,
        headerFormatter: HeaderFormatter,
        csvFormatter: this.typesFormatter
      },
      {
        dataField: "price",
        text: "Price",
        searchable: false,
        sort: true,
        filter: numberFilter({
          placeholder: "Search..."
        }),
        formatter: (cell, row) => {
          return "$".concat(cell, "");
        },
        headerFormatter: HeaderFormatter,
        csvFormatter: (cell, row) => {
          return "$".concat(cell, "");
        }
      },
      {
        dataField: "brand",
        text: "Brand",
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
      }
    ];

    const userColumns = [
      {
        dataField: "id",
        text: "ID",
        searchable: false,
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "name",
        text: "Name",
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
        dataField: "category.name",
        text: "Category",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "subcategory.name",
        text: "Subcategory",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        headerFormatter: HeaderFormatter
      },
      {
        dataField: "type",
        text: "Type",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        formatter: this.typesFormatter,
        headerFormatter: HeaderFormatter,
        csvFormatter: this.typesFormatter
      },
      {
        dataField: "price",
        text: "Price",
        searchable: false,
        sort: true,
        filter: numberFilter({
          placeholder: "Search..."
        }),
        formatter: (cell, row) => {
          return "$".concat(cell, "");
        },
        headerFormatter: HeaderFormatter,
        csvFormatter: (cell, row) => {
          return "$".concat(cell, "");
        }
      },
      {
        dataField: "brand",
        text: "Brand",
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
          currProduct: row
        });
      },
      style: { backgroundColor: "#ecf0f1" }
    };

    const WarningData = {
      title: "Are you sure?",
      type: "warning",
      footer: ""
    };

    const adminView = (
      <span>
        <EditModal
          exists={
            typeof this.state.currProduct.id !== "undefined" &&
            !this.state.deleted.includes(this.state.currProduct.id)
          }
          product={this.state.currProduct}
          updateProduct={this.props.updateProduct}
          categories={this.props.categories}
          type={this.props.types}
        />
        <DeleteAlert
          {...WarningData}
          id={this.state.currProduct.id}
          delete={this.props.deleteProduct}
          onDelete={this.onDelete}
        />
        <CSVUploadModal />
      </span>
    );

    const userView = <span></span>;

    const viewLink = (
      <button className="btn btn-link">
        <Link
          to={{
            pathname: "/manage/products/productpage",
            state: {
              product: this.state.currProduct
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
              product: this.state.currProduct
            }
          }}
        >
          View
        </Link>
      </button>
    );

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Products</h2>
        <div>
          <ToolkitProvider
            keyField="id"
            bootstrap4={true}
            data={this.props.products}
            columns={this.props.auth.isAdmin ? adminColumns : userColumns}
            exportCSV={{
              fileName:
                "Products_" +
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
                <div className="btn-group">
                  {typeof this.state.currProduct.id === "undefined"
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
  products: state.products.products //here we map store state (global) to products state reducer
  // we use products reducer and products state.
});
// connect current component to the redux store
export default connect(
  mapStateToProps,
  { getProducts, deleteProduct, updateProduct }
)(Products);
