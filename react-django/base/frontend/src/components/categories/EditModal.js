import React, { Component } from "react";
import { ModalComponent } from "../layout/ModalComponent";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import { updateSubcat, deleteSubcat } from "../../actions/subcategory";
import { updateCategory } from "../../actions/categories";
//This should look very similar to the accounts -> register.js

function isEmpty(str) {
  if (
    typeof str == "undefined" ||
    !str ||
    str.length === 0 ||
    str === "" ||
    !/[^\s]/.test(str) ||
    /^\s*$/.test(str) ||
    str.replace(/\s/g, "") === ""
  ) {
    return true;
  } else {
    return false;
  }
}
function constructArray(ArrayOfObjects) {
  var x = new Array();
  if (ArrayOfObjects === null) {
    // console.log("object is null");
  } else {
    if (
      Object.keys(ArrayOfObjects).length === 0 &&
      ArrayOfObjects.constructor === Object
    ) {
      // console.log("object is 1", this.state.subCatObj);
    } else if (ArrayOfObjects[Object.keys(ArrayOfObjects)[0]] !== undefined) {
      ArrayOfObjects.forEach(function(arrayItem) {
        x.push(arrayItem.name);
      });
    }
  }
  return x;
}
function constructArrayofIds(ArrayOfObjects) {
  var x = new Array();
  if (ArrayOfObjects === null) {
    // console.log("object is null");
  } else {
    if (
      Object.keys(ArrayOfObjects).length === 0 &&
      ArrayOfObjects.constructor === Object
    ) {
      // console.log("object is 1", this.state.subCatObj);
    } else if (ArrayOfObjects[Object.keys(ArrayOfObjects)[0]] !== undefined) {
      ArrayOfObjects.forEach(function(arrayItem) {
        x.push(arrayItem.id);
      });
    }
  }
  return x;
}
export class EditModal extends Component {
  static propTypes = {
    exists: PropTypes.bool.isRequired,
    category: PropTypes.object.isRequired,

    updateCategory: PropTypes.func.isRequired,
    updateSubcat: PropTypes.func.isRequired,
    deleteSubcat: PropTypes.func.isRequired
  };

  state = {
    id: "",
    name: "",
    subCatObj: {},
    subCatArray: [],
    subCatArrayOfIds: []
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.category !== null &&
        Object.keys(this.props.category).length !== 0
      ) {
        if (this.state.id !== this.props.category.id) {
          this.setState({
            id: this.props.category.id,
            name: this.props.category.name,
            subCatObj: this.props.category.subcategories,
            subCatArray: constructArray(this.props.category.subcategories),
            subCatArrayOfIds: constructArrayofIds(
              this.props.category.subcategories
            )
          });
        }
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { id, name } = this.state;
    const category = { name };

    var idArray = this.state.subCatArrayOfIds;
    var temString = this.state.subCatArray.toString();
    var subcatArray = temString.split(",");

    if (idArray.length !== 0) {
      for (var i = 0; i < idArray.length; i++) {
        if (isEmpty(subcatArray[i])) {
          const id = idArray[i].toString();
          this.props.deleteSubcat(id);
        } else {
          const id = idArray[i].toString();
          const name = subcatArray[i];
          const subcategory = { name };
          this.props.updateSubcat(id, subcategory);
        }
      }
    }

    this.props.updateCategory(id, category);
  };

  render() {
    return (
      <ModalComponent
        exists={this.props.exists}
        title={"Edit category details"}
        button="Edit"
        body={
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter name"
                onChange={this.onChange}
                value={this.state.name}
              />
              <label>Subcategory</label>
              <input
                type="text"
                className="form-control"
                name="subCatArray"
                placeholder="Enter name"
                onChange={this.onChange}
                value={this.state.subCatArray}
              />
            </div>
            <input type="hidden" value={this.state.id} />
            <Button type="submit">Save changes</Button>
          </form>
        }
      />
    );
  }
}

export default connect(
  null,
  { updateCategory, updateSubcat, deleteSubcat }
)(EditModal);
