import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export class GuestHelp extends Component {
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
                  id="about-tab"
                  aria-controls="registration"
                  aria-selected="true"
                  href="#About"
                  role="tab"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  data-toggle="tab"
                  className="nav-link"
                  id="registration-tab"
                  aria-controls="registration"
                  aria-selected="false"
                  href="#RegistrationLogin"
                  role="tab"
                >
                  Registration/Login
                </a>
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              <div
                id="About"
                className="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="about-tab"
              >
                <h3 className="pt-3 pb-3 pl-3 pr-3">
                  {" "}
                  Why use Agile Link's Interactive Educational Platform?{" "}
                </h3>
                <blockquote className="blockquote pl-3">
                  <p>
                    "Boost students' learning with tools and resources tailored
                    to them"
                  </p>
                </blockquote>
                <p className="pb-3 pl-3">
                  {" "}
                  We know how hard it can be to find the right resources for
                  your students. So we're here to help you access only the
                  highest quality educational products and tools, across a wide
                  range of subject areas and age levels. Whether it's for
                  learning Japanese or Javascript, Shakespeare or Statistics,
                  we're sure to have the right product for your needs. By
                  signing up to Agile Link, you'll gain access to a range of
                  products and downloadable documentation such as user manuals
                  and study guides. Through our interactive platform, you can
                  view your allocated products and browse our full catalogue of
                  items. So what are you waiting for? Get started today - your
                  students will thank you for it!{" "}
                </p>
              </div>

              <div
                id="RegistrationLogin"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="registration-tab"
              >
                <h3 className="pt-3 pb-3 pl-3 pr-3"> Registration</h3>
                  <p className="pb-3 pl-3">
                    {" "}
                    Signing up to Agile Link is easy. Just click on
                    <Link to="/register">
                      <a> Register </a>
                    </Link>
                    , fill in your institution's details and we'll send you an email to
                    confirm your account. We look forward to having you on board!
                  </p>
                <h3 className="pt-3 pb-3 pl-3 pr-3"> Logging in to your account </h3>
                  <p className="pb-3 pl-3">
                    If you've already made an account,
                    <Link to="/login">
                      <a> sign in </a>
                    </Link>  with your email and password.
                    If you've forgotten your password, click on 'Forgot your password'.
                    We'll send you a link to reset it.
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GuestHelp;
