import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import HeaderFormatter from "../layout/HeaderFormatter";
import EditModal from "./EditModal";
import DeleteAlert from "../layout/DeleteAlert";

import {
  getCategories,
  updateCategory,
  deleteCategory
} from "../../actions/categories";
import {
  getSubcat,
  updateSubcat,
  deleteSubcat
} from "../../actions/subcategory";

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  static propTypes = {
    categories: PropTypes.array.isRequired,
    // subcategories: PropTypes.array.isRequired,

    getCategories: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired
  };

  state = {
    currCategory: {},
    prevCategory: {}
  };

  componentDidMount() {
    // before render operations done concurrently. Chance to work on empty arrays.
    this.props.getCategories();
    // this.props.getSubcat();
  }

  componentDidUpdate(prevProps) {
    //this.state.prevCategory = this.state.currCategory;
  }

  onDelete() {
    this.state.prevCategory.id = this.state.currCategory.id;
    this.state.currCategory = {};
  }

  render() {
    const WarningData = {
      title: "Are you sure?",
      type: "warning",
      footer: ""
    };

    function subcategoryFormatter(cell, row) {
      if (cell[0] !== undefined) {
        var result = ``;
        for (var i = 0; i < cell.length; i++) {
          if (cell[i].name !== undefined) {
            // fixed small bug for accessing undefined field.
            result = result.concat(cell[i].name, ` `);
          }
        }
        return result;
      } else {
        return "None";
      }
    }

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
      },
      {
        dataField: "subcategories",
        text: "Subcategory name",
        sort: true,
        filter: textFilter({
          placeholder: "Search..."
        }),
        formatter: subcategoryFormatter,
        headerFormatter: HeaderFormatter
      }
    ];

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      onSelect: row => {
        this.setState({
          currCategory: row
        });
      }
    };
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Categories</h2>
        <div>
          <BootstrapTable
            keyField="id"
            data={this.props.categories}
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
              exists={
                !(this.state.currCategory.id === this.state.prevCategory.id) &&
                !(typeof this.state.currCategory.id === "undefined")
              }
              // prev={this.state.prevCategory.id}
              // curr={this.state.currCategory.id}
              category={this.state.currCategory}
              updateCategory={this.props.updateCategory}
              updateSubcat={this.props.updateSubcat} // migth be redundant
            />
            <DeleteAlert
              {...WarningData}
              id={this.state.currCategory.id}
              delete={this.props.deleteCategory}
              onDelete={this.onDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories
  // subcategories: state.subcat.subcategories
});

export default connect(
  mapStateToProps,
  {
    getCategories,
    updateCategory,
    deleteCategory,
    getSubcat,
    deleteSubcat,
    updateSubcat
  } // some functions might be redundant
)(Categories);
