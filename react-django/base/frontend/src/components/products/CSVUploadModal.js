import React, { Component } from "react";
import { ModalComponent } from "../layout/ModalComponent";
import { connect } from "react-redux";

import { CSVUpload } from "../../actions/products";
import Button from "react-bootstrap/Button";

export class CSVUploadModal extends Component {
  state = {
    csv: []
  };

  onChange = e => this.setState({ [e.target.name]: e.target.files[0] });

  onSubmit = e => {
    e.preventDefault();
    const { csv } = this.state;
    let form_data = new FormData();
    form_data.append("csv", csv);
    this.props.CSVUpload(form_data);
  };

  render() {
    return (
      <ModalComponent
        exists={true}
        title={"Batch upload by CSV"}
        button="Upload CSV"
        body={
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>CSV File</label>
              <input
                type="file"
                accept=".csv"
                className="form-control-file"
                name="csv"
                placeholder="Choose CSV file"
                onChange={this.onChange}
              />
            </div>
            <Button type="submit">Upload</Button>
          </form>
        }
      />
    );
  }
}

export default connect(
  null,
  { CSVUpload }
)(CSVUploadModal);
