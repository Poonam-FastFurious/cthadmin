/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../Confige";
import Swal from "sweetalert2";

function Faqlist() {
  const [bloges, setBloges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10); // Adjust number of blogs per page
  const [selectedFAQ, setSelectedFAQ] = useState(null); // State to hold the selected FAQ for editing
  const [updatedFAQ, setUpdatedFAQ] = useState({
    question: "",
    answer: "",
    status: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await fetch(Baseurl + "/api/v1/faq/all");
    const data = await response.json();
    setBloges(data.data||[]);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${Baseurl}/api/v1/faq/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          if (!response.ok) {
            throw new Error("Failed to delete FAQ");
          }
          fetchBlogs(); // Refresh the blog list after deletion
          Swal.fire("Deleted!", "Your FAQ has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting FAQ:", error);
          Swal.fire(
            "Error!",
            "Failed to delete FAQ. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const handleEdit = (faq) => {
    setSelectedFAQ(faq);
    setUpdatedFAQ({
      question: faq.question,
      answer: faq.answer,
      status: faq.status,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedFAQ?._id) {
      Swal.fire("Error!", "FAQ ID is required for updating.", "error");
      return;
    }
    try {
      const response = await fetch(`${Baseurl}/api/v1/faq/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedFAQ._id, ...updatedFAQ }),
      });
      if (!response.ok) {
        throw new Error("Failed to update FAQ");
      }
      fetchBlogs(); // Refresh the list after update
      Swal.fire("Updated!", "FAQ updated successfully.", "success");
      setSelectedFAQ(null);
    } catch (error) {
      console.error("Error updating FAQ:", error);
      Swal.fire("Error!", "Failed to update FAQ. Please try again.", "error");
    }
  };

  const filteredBlogs = bloges.filter((blog) =>
    blog.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Manage, FAQ</h4>
                  </div>
                  <div className="card-body">
                    <div className="listjs-table" id="customerList">
                      <div className="row g-4 mb-3">
                        <div className="col-sm-auto">
                          <div>
                            <Link to="/AddFAQ">
                              <div className="btn btn-success add-btn">
                                <i className="ri-add-line align-bottom me-1"></i>
                                Add
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="d-flex justify-content-sm-end">
                            <div className="search-box ms-2">
                              <input
                                type="text"
                                className="form-control search"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                              <th scope="col" style={{ width: "50px" }}></th>
                              <th data-sort="email">Question</th>
                              <th data-sort="phone">Answer</th>
                              <th data-sort="action">Action</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {currentBlogs.map((blog, index) => (
                              <tr key={index}>
                                <th scope="row"></th>
                                <td className="email">{blog.question}</td>
                                <td className="date">{blog.answer}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#EditshowModal"
                                        onClick={() => handleEdit(blog)}
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => handleDelete(blog._id)}
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
                        {filteredBlogs.length === 0 && (
                          <div className="noresult">
                            <div className="text-center">
                              <h5 className="mt-2">Sorry! No Result Found</h5>
                              <p className="text-muted mb-0">
                                We couldn't find any blogs matching your search.
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
                  Edit FAQ
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
                onSubmit={handleUpdate}
              >
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="question">
                      Question
                    </label>
                    <input
                      type="text"
                      id="question"
                      className="form-control"
                      value={updatedFAQ.question}
                      onChange={(e) =>
                        setUpdatedFAQ({
                          ...updatedFAQ,
                          question: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="answer">
                      Answer
                    </label>
                    <textarea
                      id="answer"
                      className="form-control"
                      rows="3"
                      value={updatedFAQ.answer}
                      onChange={(e) =>
                        setUpdatedFAQ({ ...updatedFAQ, answer: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    {/* <label className="form-label" htmlFor="status">
                      Status
                    </label> */}
                    {/* <select
                      id="status"
                      className="form-select"
                      value={updatedFAQ.status}
                      onChange={(e) =>
                        setUpdatedFAQ({ ...updatedFAQ, status: e.target.value })
                      }
                      required
                    >
                      <option value="" disabled>Select status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select> */}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-success">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faqlist;
