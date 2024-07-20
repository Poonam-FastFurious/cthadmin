import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../Confige";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";

/* eslint-disable react/no-unescaped-entities */
function Members() {
  const [selectedUser, setSelectedUser] = useState("");
  const [formData, setFormData] = useState({
    firstName: selectedUser,
    experience: "",
    designation: "",
    status: "",
    image: null,
  });
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);

  const [editMember, setEditMember] = useState({
    id: "",
    experience: "",
    designation: "",
    status: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchMembers();
  }, []);

  const fetchUsers = () => {
    fetch(Baseurl + "/api/v1/user/alluser")
      .then((response) => response.json())
      .then((data) => setUsers(data.data));
  };

  const fetchMembers = () => {
    fetch(Baseurl + "/api/v1/associate/all")
      .then((response) => response.json())
      .then((data) => setMembers(data.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("experience", formData.experience);
    data.append("designation", formData.designation);
    data.append("status", formData.status);
    data.append("image", formData.image);

    try {
      const response = await axios.post(
        Baseurl + "/api/v1/associate/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Associate member added successfully:", response.data);
      toast.success("Associate member add successfully!", response.message);
      setFormData({
        firstName: "",
        experience: "",
        designation: "",
        status: "",
        image: null,
      });
      const modalElement = document.getElementById("showModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();
      fetchMembers();
    } catch (error) {
      toast.error("Error adding associate member:", error.response.data);
      // Handle error (e.g., show error message)
    }
  };
  const handleEdit = (member) => {
    setEditMember({
      id: member._id,
      experience: member.experience,
      designation: member.designation,
      status: member.status,
    });
  };
  const handleUpdate = () => {
    fetch(Baseurl + "/api/v1/associate/edit", {
      method: "PATCH", // Use PATCH for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editMember),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Associate member updated successfully!");
          setMembers((prevMembers) =>
            prevMembers.map((member) =>
              member._id === editMember.id
                ? { ...member, ...editMember }
                : member
            )
          );
          // Reset the form
          setEditMember({
            id: "",
            experience: "",
            designation: "",
            status: "",
          });
          const modalElement = document.getElementById("EditshowModal");
          const modal = window.bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        } else {
          console.error("Error updating associate member:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
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
        fetch(`${Baseurl}/api/v1/associate/delete?id=${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              fetchMembers();
              toast.success("Member deleted successfully!");
            } else {
              toast.error("Failed to delete member.");
            }
          });
      }
    });
  };

  const filteredMembers = members.filter((member) =>
    member.user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Add, Members</h4>
                  </div>

                  <div className="card-body">
                    <div className="listjs-table" id="customerList">
                      <div className="row g-4 mb-3">
                        <div className="col-sm-auto">
                          <div>
                            <button
                              type="button"
                              className="btn btn-success add-btn"
                              data-bs-toggle="modal"
                              id="create-btn"
                              data-bs-target="#showModal"
                            >
                              <i className="ri-add-line align-bottom me-1"></i>
                              Add
                            </button>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="d-flex justify-content-sm-end">
                            <div className="search-box ms-2">
                              <input
                                type="text"
                                className="form-control search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                              <i className="ri-search-line search-icon"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive table-card mt-3 mb-1">
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              <th scope="col" style={{ width: "50px" }}>
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
                                Members
                              </th>
                              <th className="sort" data-sort="email">
                                Experience
                              </th>

                              <th className="sort" data-sort="date">
                                Joining Date
                              </th>
                              <th className="sort" data-sort="status">
                                Status
                              </th>
                              <th className="sort" data-sort="status">
                                Designation
                              </th>

                              <th className="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {currentItems.map((member, index) => (
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
                                <td className="email">
                                  {member.user.firstName}
                                </td>
                                <td className="email">
                                  {member.experience} years
                                </td>

                                <td className="email">
                                  {new Date(
                                    member.user.createdAt
                                  ).toLocaleDateString()}
                                </td>
                                <td className="status">
                                  <span className="badge bg-success-subtle text-success text-uppercase">
                                    {member.status}
                                  </span>
                                </td>
                                <td className="phone">{member.designation}</td>

                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#EditshowModal"
                                        onClick={() => handleEdit(member)}
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => handleDelete(member._id)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {filteredMembers.length === 0 && (
                          <div className="noresult">
                            <div className="text-center">
                              <lord-icon
                                src="../../../msoeawqm.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#08a88a"
                                style={{ width: "75px", height: "75px" }}
                              ></lord-icon>
                              <h5 className="mt-2">Sorry! No Result Found</h5>
                              <p className="text-muted mb-0">
                                We've searched more than 150+ Orders We did not
                                find any orders for you search.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="d-flex justify-content-end">
                        <div className="pagination-wrap hstack gap-2">
                          <button
                            className="page-item pagination-prev"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                          <ul className="pagination listjs-pagination mb-0">
                            {Array.from({ length: totalPages }, (_, index) => (
                              <li
                                key={index}
                                className={`page-item ${
                                  currentPage === index + 1 ? "active" : ""
                                }`}
                              >
                                <button
                                  onClick={() => setCurrentPage(index + 1)}
                                  className="page-link"
                                >
                                  {index + 1}
                                </button>
                              </li>
                            ))}
                          </ul>
                          <button
                            className="page-item pagination-next"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="showModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header bg-light p-3">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add AssociateMember
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
                    className="tablelist-form"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <div className="modal-body">
                      <div
                        className="mb-3"
                        id="modal-id"
                        style={{ display: "none" }}
                      >
                        <label htmlFor="id-field" className="form-label">
                          ID
                        </label>
                        <input
                          type="text"
                          id="id-field"
                          className="form-control"
                          placeholder="ID"
                          readOnly=""
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="status-field" className="form-label">
                          Select User
                        </label>
                        <select
                          className="form-control"
                          data-trigger=""
                          name="firstName"
                          id="status-field"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                        >
                          <option value="">Select a user</option>
                          {users.map((user) => (
                            <option key={user._id} value={user.firstName}>
                              {user.firstName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email-field" className="form-label">
                          Experience
                        </label>
                        <input
                          type="number"
                          id="email-field"
                          className="form-control"
                          placeholder="Enter Experience"
                          value={formData.experience}
                          onChange={handleChange}
                          required
                          name="experience"
                        />
                        <div className="invalid-feedback">
                          Please enter a Experience.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email-field" className="form-label">
                          Profile Photo
                        </label>
                        <input
                          name="image"
                          type="file"
                          id="email-field"
                          className="form-control"
                          placeholder="Enter Experience"
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a ProfilePhoto.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="phone-field" className="form-label">
                          Designation
                        </label>
                        <input
                          type="text"
                          id="phone-field"
                          className="form-control"
                          placeholder="Enter Designation"
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a Designation.
                        </div>
                      </div>

                      <div>
                        <label htmlFor="status-field" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-control"
                          data-trigger=""
                          id="status-field"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Status</option>
                          <option value="active">Active</option>
                          <option value="Block">Block</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-light"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="add-btn"
                        >
                          Add AssociateMember
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="EditshowModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header bg-light p-3">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit AssociateMember
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
                    className="tablelist-form"
                    autoComplete="off"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate();
                    }}
                  >
                    <div className="modal-body">
                      <div
                        className="mb-3"
                        id="modal-id"
                        style={{ display: "none" }}
                      >
                        <label htmlFor="id-field" className="form-label">
                          ID
                        </label>
                        <input
                          type="text"
                          id="id-field"
                          className="form-control"
                          placeholder="ID"
                          readOnly=""
                        />
                      </div>

                      <div className="mb-3" style={{ display: "none" }}>
                        <label htmlFor="status-field" className="form-label">
                          Select User
                        </label>
                        <select
                          className="form-control"
                          data-trigger=""
                          name="status-field"
                          id="status-field"
                          required=""
                          value={selectedUser} // Ensure this is set correctly if you want to display the user
                          onChange={(e) => setSelectedUser(e.target.value)}
                        >
                          <option value="">Select a user</option>

                          {users.map((user) => (
                            <option key={user._id} value={user.firstName}>
                              {user.firstName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email-field" className="form-label">
                          Experience
                        </label>
                        <input
                          type="text"
                          id="email-field"
                          className="form-control"
                          placeholder="Enter Experience"
                          required=""
                          value={editMember.experience}
                          onChange={(e) =>
                            setEditMember({
                              ...editMember,
                              experience: e.target.value,
                            })
                          }
                        />
                        <div className="invalid-feedback">
                          Please enter a Experience.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="phone-field" className="form-label">
                          Designation
                        </label>
                        <input
                          type="text"
                          id="phone-field"
                          className="form-control"
                          placeholder="Enter Designation"
                          required=""
                          value={editMember.designation}
                          onChange={(e) =>
                            setEditMember({
                              ...editMember,
                              designation: e.target.value,
                            })
                          }
                        />
                        <div className="invalid-feedback">
                          Please enter a Designation.
                        </div>
                      </div>

                      <div>
                        <label htmlFor="status-field" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-control"
                          data-trigger=""
                          name="status-field"
                          id="status-field"
                          value={editMember.status}
                          onChange={(e) =>
                            setEditMember({
                              ...editMember,
                              status: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Block</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-light"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success"
                          id="add-btn"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Members;
