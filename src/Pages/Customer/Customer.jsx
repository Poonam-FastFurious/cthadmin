/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { Baseurl } from "../../Confige";
import Swal from "sweetalert2";

function Customer() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [editUser, setEditUser] = useState({});

  const fetchUsers = () => {
    fetch(Baseurl + "/api/v1/user/alluser")
      .then((response) => response.json())
      .then((data) => setUsers(data.data));
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((item) => {
    const matchesSearch = item.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate = filterDate
      ? new Date(item.createdAt).toLocaleDateString() ===
        new Date(filterDate).toLocaleDateString()
      : true;

    return matchesSearch && matchesDate;
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${Baseurl}/api/v1/user/delete?userId=${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              fetchUsers();
              toast.success("Member deleted successfully!");
            } else {
              toast.error("Failed to delete member.");
            }
          });
      }
    });
  };
  const handleEditClick = (user) => {
    setEditUser(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    fetch(`${Baseurl}/api/v1/user/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...editUser, userId: editUser._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchUsers();
          toast.success("User updated successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Failed to update user.");
        }
      });

    const modalElement = document.getElementById("EditshowModal");
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide(); // Close the modal
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Customer</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">Compliance Townhall</Link>
                      </li>
                      <li className="breadcrumb-item active">Customer</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card" id="customerList">
                  <div className="card-header border-bottom-dashed">
                    <div className="row g-4 align-items-center">
                      <div className="col-sm">
                        <div>
                          <h5 className="card-title mb-0">Customer List</h5>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex flex-wrap align-items-start gap-2">
                          <button
                            className="btn btn-soft-danger"
                            id="remove-actions"
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border-bottom-dashed border-bottom">
                    <form>
                      <div className="row g-3">
                        <div className="col-xl-6">
                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search for customer, email, phone, status or something..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div className="col-xl-6">
                          <div className="row g-3">
                            <div className="col-sm-4">
                              <div className="">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="datepicker-range"
                                  data-provider="flatpickr"
                                  data-date-format="d M, Y"
                                  data-range-date="true"
                                  placeholder="Select date"
                                  value={filterDate}
                                  onChange={(e) =>
                                    setFilterDate(e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-success w-100"
                                  onClick={() => setFilterDate("")} // Reset filter
                                >
                                  <i className="ri-equalizer-fill me-2 align-bottom"></i>
                                  Clear Filters
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="table-responsive table-card mb-1">
                        <table
                          className="table align-middle"
                          id="customerTable"
                        >
                          <thead className="table-light text-muted">
                            <tr>
                              <th scope="col" style={{ width: "50px;" }}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>

                              <th className="sort" data-sort="customer_name">
                                UserName
                              </th>
                              <th className="sort" data-sort="customer_name">
                                Firstname
                              </th>
                              <th className="sort" data-sort="date">
                                Lastname
                              </th>
                              <th className="sort" data-sort="email">
                                Email
                              </th>
                              <th className="sort" data-sort="phone">
                                Phone
                              </th>

                              <th className="sort" data-sort="status">
                                Status
                              </th>
                              <th className="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {filteredUsers.map((item, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value="option1"
                                    />
                                  </div>
                                </th>
                                <td className="id" style={{ display: "none" }}>
                                  <Link
                                    href="javascript:void(0);"
                                    className="fw-medium link-primary"
                                  >
                                    #VZ2101
                                  </Link>
                                </td>
                                <td className="email">{item.username} </td>
                                <td className="email">{item.firstName} </td>
                                <td className="email">{item.lastName} </td>

                                <td className="email">{item.emailAddress} </td>
                                <td className="phone">{item.contactNumber}</td>

                                <td className="status">
                                  <span className="badge bg-success-subtle text-success text-uppercase">
                                    Active
                                  </span>
                                </td>
                                <td>
                                  <ul className="list-inline hstack gap-2 mb-0">
                                    <li
                                      className="list-inline-item edit"
                                      data-bs-toggle="modal"
                                      data-bs-target="#EditshowModal"
                                      onClick={() => handleEditClick(item)}
                                    >
                                      <Link
                                        to="#"
                                        className="text-primary d-inline-block edit-item-btn"
                                      >
                                        <i className="ri-pencil-fill fs-16"></i>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="#"
                                        className="link-danger"
                                        onClick={() => handleDelete(item._id)}
                                      >
                                        <i className="ri-delete-bin-5-line"></i>
                                      </Link>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="noresult" style={{ display: "none" }}>
                          <div className="text-center">
                            <lord-icon
                              src="../../../msoeawqm.json"
                              trigger="loop"
                              colors="primary:#121331,secondary:#08a88a"
                              style={{ width: "75px", height: "75px" }}
                            ></lord-icon>
                            <h5 className="mt-2">Sorry! No Result Found</h5>
                            <p className="text-muted mb-0">
                              We've searched more than 150+ customer We did not
                              find any customer for you search.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div className="pagination-wrap hstack gap-2">
                          <Link
                            className="page-item pagination-prev disabled"
                            to="#"
                          >
                            Previous
                          </Link>
                          <ul className="pagination listjs-pagination mb-0"></ul>
                          <Link className="page-item pagination-next" to="#">
                            Next
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="EditshowModal"
                      tabIndex="-1"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header bg-light p-3">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Customer
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              id="close-modal"
                            ></button>
                          </div>
                          <form
                            className="tablelist-form p-3"
                            onSubmit={handleEditSubmit}
                          >
                            <div className="row">
                              <div className="col-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="firstNameinput"
                                    className="form-label"
                                  >
                                    First Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your firstname"
                                    id="firstNameinput"
                                    name="firstName"
                                    value={editUser.firstName}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="lastNameinput"
                                    className="form-label"
                                  >
                                    Last Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your lastname"
                                    id="lastNameinput"
                                    name="lastName"
                                    value={editUser.lastName}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="mb-3">
                                  <label
                                    htmlFor="compnayNameinput"
                                    className="form-label"
                                  >
                                    Username
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter company name"
                                    id="compnayNameinput"
                                    name="username"
                                    value={editUser.username}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="phonenumberInput"
                                    className="form-label"
                                  >
                                    Phone Number
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="+(245) 451 45123"
                                    id="phonenumberInput"
                                    name="contactNumber"
                                    value={editUser.contactNumber}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="emailidInput"
                                    className="form-label"
                                  >
                                    Email Address
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder="example@gamil.com"
                                    id="emailidInput"
                                    name="emailAddress"
                                    value={editUser.emailAddress}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="mb-3">
                                  <label
                                    htmlFor="address1ControlTextarea"
                                    className="form-label"
                                  >
                                    Address
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Address 1"
                                    id="address1ControlTextarea"
                                    name="address"
                                    value={editUser.address}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="citynameInput"
                                    className="form-label"
                                  >
                                    linkedinProfile
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your linkedinProfile"
                                    id="citynameInput"
                                    name="linkedinProfile"
                                    value={editUser.linkedinProfile}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="citynameInput"
                                    className="form-label"
                                  >
                                    academicProjects
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your academicProjects"
                                    id="citynameInput"
                                    name="academicProjects"
                                    value={editUser.academicProjects}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="mb-3">
                                  <label
                                    htmlFor="citynameInput"
                                    className="form-label"
                                  >
                                    HonoursAndCertifications
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your Certifications"
                                    id="citynameInput"
                                    name="honoursAndCertifications"
                                    value={editUser.honoursAndCertifications}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="text-end">
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;
