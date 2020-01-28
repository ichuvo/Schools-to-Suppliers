import React, { Component } from "react";
import Swal from "sweetalert2";
import store from "../../store";
import PropTypes from "prop-types";

import { create } from "../../actions/auth";
import { createMessage, returnErrors } from "../../actions/messages";

export class DeleteAlert extends Component {
  constructor() {
    super();
    this.HandleClick = this.HandleClick.bind(this);
    //this.props.onDelete=this.props.onDelete.bind(this);
  }

  state = {
    prevID: ""
  };

  HandleClick() {
    if (
      typeof this.props.id === "undefined" ||
      this.props.id == this.state.prevID
    ) {
      store.dispatch(createMessage({ wrongInput: "No item selected" }));
      return;
    }
    Swal.fire({
      ...this.props,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      onOpen: () => {
        // code
      }
    }).then(result => {
      if (result.value) {
        this.props.delete(this.props.id);
        store.dispatch(this.props.onDelete);
        this.state.prevID = this.props.id;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  render() {
    return (
      <button className="btn btn-link" onClick={this.HandleClick}>
        Delete
      </button>
    );
  }
}

export default DeleteAlert;
