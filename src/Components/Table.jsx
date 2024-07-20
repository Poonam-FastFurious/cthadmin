import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
function Table() {
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Add, Banner</h4>
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
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
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
                                Image
                              </th>
                              <th className="sort" data-sort="email">
                                Title
                              </th>
                              <th className="sort" data-sort="phone">
                                Place
                              </th>
                              <th className="sort" data-sort="date">
                                Link
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
                            <tr>
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
                              <td className="customer_name">
                                <div className="flex-shrink-0 me-2">
                                  <img
                                    src="https://themesbrand.com/velzon/html/master/assets/images/companies/img-1.png"
                                    alt=""
                                    className="avatar-sm p-2"
                                  />
                                </div>
                              </td>
                              <td className="email">Home banner </td>
                              <td className="phone">Home</td>
                              <td className="date">brandbell.in</td>
                              <td className="status">
                                <span className="badge bg-success-subtle text-success text-uppercase">
                                  Active
                                </span>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#EditshowModal"
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
                      </div>

                      <div className="d-flex justify-content-end">
                        <div className="pagination-wrap hstack gap-2">
                          <Link
                            className="page-item pagination-prev disabled"
                            href="javascript:void(0);"
                          >
                            Previous
                          </Link>
                          <ul className="pagination listjs-pagination mb-0"></ul>
                          <Link
                            className="page-item pagination-next"
                            href="javascript:void(0);"
                          >
                            Next
                          </Link>
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
                      Add Banner
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="close-modal"
                    ></button>
                  </div>
                  <form className="tablelist-form" autoComplete="off">
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
                        <label
                          htmlFor="customername-field"
                          className="form-label"
                        >
                          Banner Title
                        </label>
                        <input
                          type="text"
                          id="customername-field"
                          className="form-control"
                          placeholder="Enter Title"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter a Banner Title.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email-field" className="form-label">
                          Link
                        </label>
                        <input
                          type="text"
                          id="email-field"
                          className="form-control"
                          placeholder="Enter Link"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter a Link.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="phone-field" className="form-label">
                          Place
                        </label>
                        <input
                          type="text"
                          id="phone-field"
                          className="form-control"
                          placeholder="Enter Place"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter a phone.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone-field" className="form-label">
                          Banner
                        </label>
                        <input
                          type="file"
                          id="phone-field"
                          className="form-control"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter a phone.
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
                          required=""
                        >
                          <option value="">Status</option>
                          <option value="Active">Active</option>
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
                          Add Banner
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
                      Edit Banner
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="close-modal"
                    ></button>
                  </div>
                  <form className="tablelist-form" autoComplete="off">
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
                        <label
                          htmlFor="customername-field"
                          className="form-label"
                        >
                          Banner Title
                        </label>
                        <input
                          type="text"
                          id="customername-field"
                          className="form-control"
                          placeholder="Enter Title"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter a Banner Title.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email-field" className="form-label">
                          Link
                        </label>
                        <input
                          type="text"
                          id="email-field"
                          className="form-control"
                          placeholder="Enter Link"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter a Link.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="phone-field" className="form-label">
                          Place
                        </label>
                        <input
                          type="text"
                          id="phone-field"
                          className="form-control"
                          placeholder="Enter Place"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter a phone.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone-field" className="form-label">
                          Banner
                        </label>
                        <input
                          type="file"
                          id="phone-field"
                          className="form-control"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter a phone.
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
                          required=""
                        >
                          <option value="">Status</option>
                          <option value="Active">Active</option>
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
                          Update Banner
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

export default Table;
