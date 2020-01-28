import React, { Component } from "react";
import { ModalComponent } from "../layout/ModalComponent";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";

import { updateGroup } from "../../actions/groups";

//This should look very similar to the accounts -> register.js

export class EditModal extends Component {
  static propTypes = {
    exists: PropTypes.bool.isRequired,
    group: PropTypes.object.isRequired,
    updateGroup: PropTypes.func.isRequired
  };

  state = {
    id: "",
    name: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.group !== null &&
        Object.keys(this.props.group).length !== 0
      ) {
        this.setState({
          id: this.props.group.id,
          name: this.props.group.name
        });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { id, name } = this.state;
    const group = { name };
    this.props.updateGroup(id, group);
  };

  render() {
    return (
      <ModalComponent
        exists={this.props.exists}
        title={"Edit group details"}
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
  { updateGroup }
)(EditModal);
