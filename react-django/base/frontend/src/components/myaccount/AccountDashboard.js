import React, { Fragment } from "react";
import Form from "./Form";

// Just combines the two components into one, making calling it in the future easier

export default function AccountDashboard() {
  return (
    <div className="container">
      <Fragment>
        <Form />
      </Fragment>
    </div>
  );
}
