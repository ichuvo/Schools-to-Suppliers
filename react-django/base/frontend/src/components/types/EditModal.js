import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";

import ModalComponent from "../layout/ModalComponent";
import { updateType } from "../../actions/pTypes";

export class EditModal extends Component {
  static propTypes = {
    exists: PropTypes.bool.isRequired,
    type: PropTypes.object.isRequired,
    updateType: PropTypes.func.isRequired
  };

  state = {
    id: "",
    name: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.type !== null &&
        Object.keys(this.props.type).length !== 0
      ) {
        this.setState({
          id: this.props.type.id,
          name: this.props.type.name
        });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { id, name } = this.state;
    const type = { name };
    this.props.updateType(id, type);
  };

  render() {
    return (
      <ModalComponent
        exists={this.props.exists}
        title={"Edit type details"}
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
                required
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
  { updateType }
)(EditModal);
