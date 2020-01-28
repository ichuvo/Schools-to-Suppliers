import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import store from "../store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AlertTemplate from "react-alert-template-basic";
import { Hero } from "react-landing-page";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

//Import components into the website
import { loadUser } from "../actions/auth";
import Header from "./layout/Header";
import Landing from "./pages/Landing";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import UserDashboard from "./users/UserDashboard";
import ProductDashboard from "./products/ProductDashboard";
import CategoriesDashboard from "./categories/CategoriesDashboard";
import TypesDashboard from "./types/TypesDashboard";
import AllocationsDashboard from "./allocations/AllocationsDashboard";
import AccountDashboard from "./myaccount/AccountDashboard";
import GroupsDashboard from "./groups/GroupsDashboard";
import PasswordChange from "./accounts/PasswordChange";
import PasswordReset from "./accounts/PasswordReset";
import ProductPage from "./products/ProductPage";
import AllocationPage from "./allocations/AllocationPage";
import AdminHelp from "./help/AdminHelp";
import InstituteHelp from "./help/InstituteHelp";
import GuestHelp from "./help/GuestHelp";

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <Hero
                color="black"
                bgOpacity={0.3}
                bg="white"
                backgroundImage="../../../../media/usyd.jpg"
              >
                <div className="container-fluid">
                  <Switch>
                    <Route exact path="/" component={Landing} />
                    <PrivateRoute
                      exact
                      path="/manage/users"
                      component={UserDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/manage/myaccount"
                      component={AccountDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/manage/products"
                      component={ProductDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/manage/categories"
                      component={CategoriesDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/manage/types"
                      component={TypesDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/manage/allocations"
                      component={AllocationsDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/manage/groups"
                      component={GroupsDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/manage/products/productpage"
                      component={ProductPage}
                    />
                    <PrivateRoute
                      exact
                      path="/manage/allocations/allocationpage"
                      component={AllocationPage}
                    />
                    <PrivateRoute
                      exact
                      path="/manage/institutehelp"
                      component={InstituteHelp}
                    />
                    <PrivateRoute
                      exact
                      path="/manage/adminhelp"
                      component={AdminHelp}
                    />

                    <Route exact path="/manage/guesthelp" component={GuestHelp}/>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route
                      exact
                      path="/password_reset"
                      component={PasswordReset}
                    />
                    <Route
                      exact
                      path="/password_reset/confirm"
                      component={PasswordChange}
                    />
                    <Route render={() => <div>404</div>} />
                  </Switch>
                </div>
              </Hero>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
