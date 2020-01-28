import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const swalPropsError = {
      type: "error",
      toast: true,
      position: "top",
      timer: 3000,
      showConfirmButton: false
    };

    const swalPropsSuccess = {
      type: "success",
      toast: true,
      position: "top",
      timer: 3000,
      showConfirmButton: false
    };

    const swalPropsSuccessModal = {
      type: "success",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false
    };

    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name)
        Swal.fire({
          ...swalPropsError,
          text: error.msg.name.join("\n")
        });
      if (error.msg.email)
        Swal.fire({
          ...swalPropsError,
          text: error.msg.email.join("\n")
        });
      if (error.msg.message)
        Swal.fire({
          ...swalPropsError,
          text: error.msg.message.join("\n")
        });
      if (error.msg.non_field_errors)
        Swal.fire({
          ...swalPropsError,
          text: error.msg.non_field_errors.join("\n")
        });
      if (error.msg.username)
        Swal.fire({
          ...swalPropsError,
          text: error.msg.username.join("\n")
        });
      if (error.msg.in_use)
        Swal.fire({
          ...swalPropsError,
          text: error.msg.in_use
        });
      if (error.msg.password)
        Swal.fire({
          ...swalPropsError,
          text: error.msg.password.join("\n"),
          timer: 0,
          showConfirmButton: true
        });
    }

    if (message !== prevProps.message) {
      if (message.deleteUser)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.deleteUser
        });
      if (message.deleteProduct)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.deleteProduct
        });
      if (message.deleteReview)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.deleteReview
        });
      if (message.deleteCategory)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.deleteCategory
        });
      if (message.deleteSubCat)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.deleteSubCat
        });
      if (message.deleteType)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.deleteType
        });
      if (message.deleteAllocation)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.deleteAllocation
        });
      if (message.deleteGroup)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.deleteGroup
        });
      if (message.addUser)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.addUser
        });
      if (message.addProduct)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.addProduct
        });
      if (message.addCategory)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.addCategory
        });
      if (message.addSubCat)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.addUser
        });
      if (message.addType)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.addType
        });
      if (message.addAllocation)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.addAllocation
        });
      if (message.addReview)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.addReview
        });
      if (message.addGroup)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.addGroup
        });
      if (message.passwordNotMatch)
        Swal.fire({
          ...swalPropsError,
          text: message.passwordNotMatch
        });
      if (message.updateUser)
        Swal.fire({
          ...swalPropsSuccessModal,
          text: message.updateUser
        });
      if (message.updateProduct)
        Swal.fire({
          ...swalPropsSuccessModal,
          text: message.updateProduct
        });
      if (message.updateCategory)
        Swal.fire({
          ...swalPropsSuccessModal,
          text: message.updateCategory
        });
      if (message.updateSubCat)
        Swal.fire({
          ...swalPropsSuccessModal,
          text: message.updateSubCat
        });
      if (message.updateType)
        Swal.fire({
          ...swalPropsSuccessModal,
          text: message.updateType
        });
      if (message.updateAllocation)
        Swal.fire({
          ...swalPropsSuccessModal,
          text: message.updateAllocation
        });
      if (message.updateGroup)
        Swal.fire({
          ...swalPropsSuccessModal,
          text: message.updateGroup
        });
      if (message.wrongInput)
        Swal.fire({
          ...swalPropsError,
          text: message.wrongInput
        });
      if (message.changePassword)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.changePassword
        });
      if (message.resetPassword)
        Swal.fire({
          ...swalPropsSuccess,
          text: message.resetPassword
        });
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
