/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../Confige";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Gallery() {
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    image: null,
  });
  const [gallery, setGallery] = useState([]);
  const [filtergallery, setFiltergallery] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageError, setImageError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/gallery/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGallery(data.data);
        setFiltergallery(data.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchData();
  }, []);
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredBanners = gallery.filter((banner) =>
      banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltergallery(filteredBanners);
    setCurrentPage(1); // Reset to first page when searching
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtergallery.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      const file = files[0];
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width !== 1280 || img.height !== 1280) {
          setImageError("Image dimensions must be 1280 by 1280.");
        } else {
          setImageError(""); // Clear error if dimensions are correct
          setFormData((prevState) => ({
            ...prevState,
            [name]: file,
          }));
        }
      };
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageError) {
      toast.error(imageError);
      return;
    }

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("status", formData.status);
    formPayload.append("image", formData.image);

    const requestOptions = {
      method: "POST",
      body: formPayload,
    };

    try {
      const response = await fetch(
        Baseurl + "/api/v1/gallery/add",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle success scenario
      const data = await response.json();
      setGallery([...gallery, data.data]);
      setFiltergallery([...gallery, data.data]);
      // Close modal
      const modalElement = document.getElementById("showModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();
      toast.success("🦄 gallery Added succsessfull!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: {},
      });
    } catch (error) {
      console.error("Error adding banner:", error);
      toast.error("Failed to add banner. Please try again.");
    }
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
          const response = await fetch(Baseurl + `/api/v1/gallery/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          if (!response.ok) {
            throw new Error("Failed to delete banner");
          }
          setGallery(gallery.filter((banner) => banner._id !== id));
          setFiltergallery(filtergallery.filter((banner) => banner._id !== id));
          Swal.fire("Deleted!", "Your banner has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting banner:", error);
          Swal.fire(
            "Error!",
            "Failed to delete banner. Please try again.",
            "error"
          );
        }
      }
    });
  };
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Add, Gallery</h4>
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
                                onChange={handleSearch}
                                value={searchTerm}
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
                              <th data-sort="customer_name">Image</th>
                              <th data-sort="email">Title</th>
                              <th data-sort="email">Status</th>
                              <th data-sort="action">Action</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {currentItems.map((items, index) => (
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
                                <td className="customer_name">
                                  <div className="flex-shrink-0 me-2">
                                    <img
                                      src={items.image}
                                      alt=""
                                      className="avatar-md p-2"
                                    />
                                  </div>
                                </td>
                                <td className="email">{items.title} </td>
                                <td className="status">
                                  <span className="badge bg-success-subtle text-success text-uppercase">
                                    {items.status}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => handleDelete(items._id)}
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
                        {filtergallery.length === 0 && (
                          <div className="noresult">
                            <div className="text-center">
                              <lord-icon
                                src="../../../msoeawqm.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#08a88a"
                                style={{ width: "75px", height: "40px" }}
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
                        <nav>
                          <ul className="pagination">
                            <li
                              className={`page-item ${
                                currentPage === 1 && "disabled"
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage - 1)}
                              >
                                Previous
                              </button>
                            </li>
                            {Array.from(
                              {
                                length: Math.ceil(
                                  filtergallery.length / itemsPerPage
                                ),
                              },
                              (_, i) => (
                                <li
                                  key={i}
                                  className={`page-item ${
                                    currentPage === i + 1 && "active"
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => paginate(i + 1)}
                                  >
                                    {i + 1}
                                  </button>
                                </li>
                              )
                            )}
                            <li
                              className={`page-item ${
                                currentPage ===
                                  Math.ceil(
                                    filtergallery.length / itemsPerPage
                                  ) && "disabled"
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </nav>
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
                        <label
                          htmlFor="customername-field"
                          className="form-label"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          id="customername-field"
                          className="form-control"
                          placeholder="Enter Title"
                          required
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Please enter a Title.
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
                          name="image"
                          required
                          onChange={handleChange}
                        />
                        {imageError && (
                          <div className="text-danger mt-2">{imageError}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="status-field" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-control"
                          name="status"
                          id=""
                          required
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="">Select Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Block</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a Status
                        </div>
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
                          Add Gallery
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

export default Gallery;
