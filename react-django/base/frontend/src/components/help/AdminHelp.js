import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";


export class AdminHelp extends Component {
  render() {
    const style = {
      color: "#18BC9C"
     };

    return (
      <div className="container-fluid pt-5">
        <div className="card mb-3 h-500">
          <div className="card-header">
            <h1>Help</h1>
          </div>
          <div className="card-body">
            <div className="overflow-auto">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    data-toggle="tab"
                    className="nav-link active"
                    id="account-tab"
                    aria-controls="registration"
                    aria-selected="true"
                    href="#AccountManagement"
                    role="tab"
                  >
                    Account Management
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="tab"
                    className="nav-link"
                    id="product-tab"
                    aria-controls="account"
                    aria-selected="false"
                    href="#ProductManagement"
                  >
                    Product Management
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="tab"
                    className="nav-link"
                    id="allocation-tab"
                    aria-controls="product"
                    aria-selected="false"
                    href="#AllocationManagement"
                  >
                    Allocation Management
                  </a>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div
                  id="AccountManagement"
                  className="tab-pane fade show active"
                  role="tabpanel"
                  aria-labelledby="account-tab"
                >
                  <h3 className="pb-3 pl-3 pt-3">Create an Admin</h3>
                                  
                  <p className="pt-3 pb-3 pl-3">
                     To register a new admin, this is done through the shell:       
                    <ol>          
                      <li>
                        Ensure the virtual environment is running in
                        react-django/base
                      </li>
                      <li>
                        Run the following command <b><i>python manage.py createsuperuser</i></b>
                      </li>
                      <li>Fill in the relevant details and if the password is too
                        similar or too short, you have the option to override
                        this.
                        </li>
                    </ol>
                  </p>

                  <center>
                                
                    <img
                      src="..\..\..\..\media\Gifs\CreateSuperUser.gif"
                      alt="Create An Admin"
                      width="800"
                      height="400"
                    ></img>
                    <p>
                      <i>Creating an admin through the shell</i>
                    </p>
                                      
                  </center>
                               
                  <h3 className="pt-3 pb-3 pl-3 pt-3">
                    Create A New Institution </h3>       
                  <p className="pt-3 pb-3 pl-3">
                     To register a new user (institution):                   
                    <ol>  
                      <li>Locate the Institutions drop down on the Navigation bar</li>
                      <li> Click <Link to="/manage/users">View Institutions</Link> in the dropdown menu
                      </li>
                      <li>
                        Fill out the form at the bottom of the page labelled "Create User" </li>
                    </ol>
                  </p>
                                    
                  <center>
                                
                    <img
                      src="..\..\..\..\media\Gifs\UserRegister.gif"
                      alt="Register Institution"
                      width="900"
                      height="400"
                    ></img>
                    <p>
                      <i>Navigating to the Users database page</i>
                    </p>
                                      
                  </center>

                  <h3 className="pt-3 pb-3 pl-3 pt-3">
                    Editing an Institution </h3>

                    <p>
                      <ol>
                        <li>
                          Select the entry in the table you wish to edit
                        </li>
                        <li>
                          Click the <b>edit</b> button at the bottom of that table
                        </li>
                        <li>
                          Edit the relevant fields and press the <b>Save Changes</b> button to update the entry in the table
                        </li>
                      </ol>
                    </p>

                  <h3 className="pt-3 pb-3 pl-3 pt-3">
                    Deleting an Institution </h3>

                    <p>
                      <ol>
                        <li>
                          Select the entry in the table you wish to delete
                        </li>
                        <li>
                          Click the <b>delete</b> button at the bottom of that table
                        </li>
                        <li>
                          Click the <b>confirm</b> to accept the deletion of that entry
                        </li>
                      </ol>
                    </p>


                    <h3 className="pt-3 pb-3 pl-3 pt-3">
                    Resetting a password</h3>

                    <p>
                      <ol>
                        <li>
                          Select the entry in the table whose password you wish to reset
                        </li>
                        <li>
                          Click the <b>Reset Password</b> button at the bottom of that table
                        </li>
                        <li>
                          An email will be sent to that user's registered address, with a link to reset their password.
                          You should see an "Email Sent!" success message.
                        </li>
                      </ol>
                    </p>
                                  
                </div>

              <div
                id="ProductManagement"
                className="tab-pane fade"
                role="tabpanel"
                aria-labelledby="product-tab"
              >
              <p>
              </p>
                <h3 className="pt-3 pb-3 pl-3 pr-3">
                  Viewing Products
                </h3>

                  <p className="pt-3 pb-3 pl-3">
                    By clicking on Products →
                    <Link to="/manage/products">
                      <a>Product List </a>
                    </Link>
                    in the top navigation bar, you can view all educational
                    products in AgileLink's database. Select any product and click
                    View for more details, including images and documentation such
                    as downloadable user manuals and study programs. You can also
                    sort or search on the table by clicking on any of the columns or typing in the search bars respectively. 
                  </p>

                  <center>        
                    <img
                      src="..\..\..\..\media\Gifs\ViewProduct.gif"
                      alt="View Search Sort Products"
                      width="800"
                      height="400"
                    ></img>
                    <p>
                      <i>View, Sort and Search Products</i>
                    </p>               
                  </center>

                <h3 className="pt-3 pb-3 pl-3 pr-3">

                  Creating Products

                </h3>

                <p className="pt-3 pb-3 pl-3">

                  On the Product page, scroll to the bottom and fill out the Create Product form at the bottom of the page. Click submit to save the product into the database.

                </p>

                <center>
                                
                    <img
                      src="..\..\..\..\media\Gifs\CreateProduct.gif"
                      alt="Creating Products"
                      width="900"
                      height="500"
                    ></img>
                    <p>
                      <i>Create Product</i>
                    </p>
                                      
                  </center>

                <h3 className="pt-3 pb-3 pl-3 pr-3">

                  Exporting CSV

                </h3>

                <p className="pt-3 pb-3 pl-3">

                  By clicking on "Export CSV", you can download a Comma-Separated Values
                  file containing details of all products. This file can be
                  opened in Microsoft Excel for your convenience. 

                </p>


                <h3 className="pt-3 pb-3 pl-3 pr-3">

                  Batch-Creating Products

                </h3>

                  <p className="pt-3 pb-3 pl-3">

                    To quickly add multiple products:

                    <ol>
                                 
                      <li>
                        Create a .CSV file. This can be done in Microsoft Excel.
                        The file must contain the following columns, in this order:
                        <table>
                          <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>Quantity</th>
                          </tr>
                        </table>
                        For products with multiple types, please separate types in the
                        CSV file using the pipe character (|) as follows:
                        Type1|Type2|Type3|...
                      </li>
                                  
                      <li>
                        Click 'Upload'. A success message will appear at the
                        top of the screen when products are added successfully.
                      </li>
                                
                    </ol>

                  </p>

                  <center>        
                    <img
                      src="..\..\..\..\media\Gifs\ExportUploadCSVPRoducts.gif"
                      alt="CSV Upload and Export Products"
                      width="900"
                      height="400"
                    ></img>
                    <p>
                      <i>CSV Upload and Export for Products</i>
                    </p>               
                  </center>
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
                <h3 className="pt-3 pb-3 pr-3"> Viewing Allocations </h3>
                <p>
                  You can view all items allocated to each institution by
                  clicking on Allocations
                  →
                  <Link to="/manage/allocations">
                    <a>View Allocations </a>
                  </Link>{" "}
                  in the top navigation bar. Select any allocation and click
                  View to see details. You can also choose to export a{" "}
                  <abbr title="Comma-Separated Values">CSV</abbr> file
                  containing details of all your current allocations. This file
                  can be opened in Microsoft Excel for your own records. Just
                  click on the "Export CSV" link under the table.
                </p>

                <h3 className="pt-3 pb-3 pl-3 pr-3">

                  Allocating Products to Users

                </h3>

                <p>
                In the Create Allocation form:
                  <ol>
                    <li>
                      Select the educational institution through the User field
                    </li>
                    <li>
                      Select the product you wish to allocate. Multiple products can be selected.
                    </li>
                    <li>
                      Enter the quantity you wish to allocate. (Note: the allocation will not work if the product doesn’t have sufficient quantity)
                    </li>
                    <li>
                      Type in an optional message to display to the user.
                    </li>
                    <li>
                    Click submit and you should see your allocation added in the table.
                    </li>
                  </ol>
                </p>

                <h3 className="pt-3 pb-3 pl-3 pr-3">

                  Allocating Products to Groups

                </h3>

                <p>
                In the Create Allocation form:
                  <ol>
                    <li>
                      Select the 'Allocate on Group' tab
                    </li>
                    <li>
                      Select the products and quantity as you would for allocating to individual users.
                    </li>
                    <li>
                      Note: The same quantity will be allocated to all users in the group.
                      For example, if there are 5 users in the group and the quantity selected is 20,
                      a total quantity of 100 will be allocated. If the product's quantity is not at least 100,
                      the allocation will not be allowed.
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
                  <p className="pt-3 pb-3 pl-3">
                    {" "}
                    As an AgileLink customer, you will be allocated educational
                    products and resources based on your orders. You can view
                    all items allocated to your institution by clicking on
                    Allocations >
                    <Link to="/manage/allocations">
                      <a>View Allocations</a>
                    </Link>{" "}
                    in the top navigation bar. Select any allocation and click
                    View to see details. You can also choose to export a{" "}
                    <abbr title="Comma-Separated Values">CSV</abbr> file
                    containing details of all your current allocations. This
                    file can be opened in Microsoft Excel for your own records.
                    Just click on the "Export CSV" link under the table.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHelp;
