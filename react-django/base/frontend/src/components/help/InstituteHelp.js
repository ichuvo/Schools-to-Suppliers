import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export class InstituteHelp extends Component {
  render() {
    return (
      <div className="container-fluid position-relative">
        <div className="card mb-3">
          <div className="card-header">
            <h1>Help</h1>
          </div>
          <div className="card-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  data-toggle="tab"
                  className="nav-link active"
                  id="registration-tab"
                  aria-controls="registration"
                  aria-selected="true"
                  href="#RegistrationLogin"
                  role="tab"
                >
                  Registration/Login
                </a>
              </li>
              <li>
                <a
                  data-toggle="tab"
                  className="nav-link"
                  id="account-tab"
                  aria-controls="account"
                  aria-selected="false"
                  href="#AccountManagement"
                >
                  Account Management
                </a>
              </li>
              <li>
                <a
                  data-toggle="tab"
                  className="nav-link"
                  id="product-tab"
                  aria-controls="product"
                  aria-selected="false"
                  href="#ProductManagement"
                >
                  Product Management
                </a>
              </li>
              <li class="tab-content">
                <a
                  data-toggle="tab"
                  className="nav-link"
                  id="allocation-tab"
                  aria-controls="allocation"
                  aria-selected="false"
                  href="#AllocationManagement"
                >
                  Allocation Management
                </a>
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              <div
                id="RegistrationLogin"
                className="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="registration-tab"
              >
                <h3 className="pt-3 pb-3 pl-3 pr-3"> Registration </h3>
                <p className="pb-3 pl-3">
                  {" "}
                  Welcome and thanks for joining AgileLink! In case you ever
                  forget your password, simply click the "Forgot your password?"
                  link on the Login page. We'll send you an email to help you
                  reset your password.{" "}
                </p>
              </div>
              <div
                id="AccountManagement"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="account-tab"
              >
                <h3 className="pt-3 pb-3 pl-3 pr-3"> Account </h3>
                <p className="pb-3 pl-3">
                  {" "}
                  If you ever need to update the details for your instutition,
                  click on Profile >{" "}
                  <Link to="/manage/myaccount">
                    <a>My Account</a>
                  </Link>{" "}
                  in the top navigation bar.{" "}
                </p>
              </div>
              <div
                id="ProductManagement"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="product-tab"
              >
                <h3 className="pt-3 pb-3 pr-3"> Viewing Products </h3>
                <p>
                  {" "}
                  By clicking on Products >
                  <Link to="/manage/products">
                    <a>Product List</a>
                  </Link>{" "}
                  in the top navigation bar, you can view all educational
                  products in AgileLink's database. Select any product and click
                  View for more details, including images and documentation such
                  as downloadable user manuals and study programs. You can also
                  sort the table by clicking on any of the columns. By clicking
                  on "Export CSV", you can download a Comma-Separated Values
                  file containing details of all products. This file can be
                  opened in Microsoft Excel for your convenience.{" "}
                </p>
                <h3 className="pt-3 pb-3 pl-3 pr-3">

                  Reviews

                </h3>

                <p>
                After selecting a product and clicking 'View':
                  <ol>
                    <li>
                      Click on the 'Reviews' tab to see all reviews written about the product by other educational institutions.
                    </li>
                    <li>
                      To leave your own review, click on the 'Leave Review' tab. Reviews must have a rating (out of 5 stars), a title and a comment.
                    </li>
                    <li>
                      Click 'Submit' and a success message will occur when your review is submitted.
                    </li>
                  </ol>
                </p>
              </div>
              <div
                id="AllocationManagement"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="allocation-tab"
              >
                <h3 className="pt-3 pb-3 pl-3 pr-3"> Allocations </h3>
                <p className="pb-3 pl-3">
                  {" "}
                  As an AgileLink customer, you will be allocated educational
                  products and resources based on your orders. You can view all
                  items allocated to your institution by clicking on Allocations
                  >
                  <Link to="/manage/allocations">
                    <a>View Allocations</a>
                  </Link>{" "}
                  in the top navigation bar. Select any allocation and click
                  View to see details. You can also choose to export a{" "}
                  <abbr title="Comma-Separated Values">CSV</abbr> file
                  containing details of all your current allocations. This file
                  can be opened in Microsoft Excel for your own records. Just
                  click on the "Export CSV" link under the table.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InstituteHelp;
