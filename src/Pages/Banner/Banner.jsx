import Swal from "sweetalert2";
import { Baseurl } from "../../Confige";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/* eslint-disable react/no-unescaped-entities */
function Banner() {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    link: "",
    status: "", // Assuming you need to add a field for status
    type: "1", // Assuming you need to add a field for type
    image: null,
  });

  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [editBanner, setEditBanner] = useState(null);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("details", formData.details);
    formPayload.append("link", formData.link);
    formPayload.append("status", formData.status);
    formPayload.append("type", formData.type);
    formPayload.append("image", formData.image);

    const requestOptions = {
      method: "POST",
      body: formPayload,
    };

    try {
      const response = await fetch(
        Baseurl + "/api/v1/Banner/add",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle success scenario

      setFormData({
        title: "",
        details: "",
        link: "",
        status: "",
        type: "",
        image: null,
      });
      // Close modal
      const modalElement = document.getElementById("showModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();
      toast.success("🦄 banner Added succsessfull!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error adding banner:", error);
      toast.error("Failed to add banner. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredBanners = banners.filter((banner) =>
      banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBanners(filteredBanners);
    setCurrentPage(1); // Reset to first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/Banner/allabnner");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBanners(data.data); // Assuming data is an array of banner objects
        setFilteredBanners(data.data); // Initialize filteredBanners with all banners initially
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchData();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBanners.slice(indexOfFirstItem, indexOfLastItem);

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
          const response = await fetch(Baseurl + `/api/v1/Banner/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          if (!response.ok) {
            throw new Error("Failed to delete banner");
          }
          setBanners(banners.filter((banner) => banner._id !== id));
          setFilteredBanners(
            filteredBanners.filter((banner) => banner._id !== id)
          );
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
  const handleEdit = (banner) => {
    setEditBanner(banner);
    setFormData({
      title: banner.title,
      details: banner.details,
      link: banner.link,
      status: banner.status,
      type: banner.type,
      image: banner.image,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("id", editBanner._id);
    formPayload.append("title", formData.title);
    formPayload.append("details", formData.details);
    formPayload.append("link", formData.link);
    formPayload.append("status", formData.status);
    formPayload.append("type", formData.type);
    formPayload.append("image", formData.image);

    const requestOptions = {
      method: "PATCH",
      body: formPayload,
    };

    try {
      const response = await fetch(
        Baseurl + `/api/v1/Banner/edit`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedBanner = await response.json();
      const updatedBanners = banners.map((banner) =>
        banner._id === updatedBanner._id ? updatedBanner : banner
      );
      setBanners(updatedBanners);
      setFilteredBanners(updatedBanners);
      setEditBanner(null);
      setFormData({
        title: "",
        details: "",
        link: "",
        status: "",
        type: "",
        image: null,
      });
      const modalElement = document.getElementById("EditshowModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();
      toast.success("🦄 Banner updated successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error("Failed to update banner. Please try again.");
    }
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
                              <th data-sort="customer_name">Image</th>
                              <th data-sort="email">Title</th>
                              <th data-sort="phone">Place</th>
                              <th data-sort="date">Link</th>
                              <th data-sort="status">Status</th>
                              <th data-sort="action">Action</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {currentItems.map((item, index) => (
                              <tr key={index}>
                                <td className="customer_name">
                                  <div className="flex-shrink-0 me-2">
                                    <img
                                      src={item.image}
                                      alt=""
                                      className="avatar-sm p-2"
                                    />
                                  </div>
                                </td>
                                <td className="home">{item.title} </td>
                                <td className="phone">{item.type}</td>
                                <td className="date">{item.link}</td>
                                <td className="status">
                                  <span className="badge bg-success-subtle text-success text-uppercase">
                                    {item.status}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        id="edit-btn"
                                        data-bs-target="#EditshowModal  "
                                        onClick={() => handleEdit(item)}
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => handleDelete(item._id)}
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
                        {filteredBanners.length === 0 && (
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
                                  filteredBanners.length / itemsPerPage
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
                                    filteredBanners.length / itemsPerPage
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
                      Add BANNER
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
                      <div className="mb-3">
                        <label htmlFor="title-field" className="form-label">
                          Banner Title
                        </label>
                        <input
                          type="text"
                          id="title-field"
                          className="form-control"
                          placeholder="Enter Title"
                          required
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Please enter a Title
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="link-field" className="form-label">
                          Link
                        </label>
                        <input
                          type="text"
                          id="link-field"
                          className="form-control"
                          placeholder="Enter Link"
                          required
                          name="link"
                          value={formData.link}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Please enter a Link
                        </div>
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
                          <option value="Active">Active</option>
                          <option value="Block">Block</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a Status
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="type-field" className="form-label">
                          Place
                        </label>
                        <select
                          className="form-control"
                          name="type"
                          id="type"
                          required
                          value={formData.type}
                          onChange={handleChange}
                        >
                          <option value="">Select place</option>
                          <option value="Home">Home </option>
                          <option value="AboutUs">AboutUs </option>
                          <option value="Blogs">Blogs </option>
                          <option value="gallery">gallery </option>
                          <option value="contact">contact </option>
                          <option value="associatedMembers">
                            associatedMembers
                          </option>
                          <option value="Aboutus">Aboutus </option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a Type
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="image-field" className="form-label">
                          Image
                        </label>
                        <input
                          type="file"
                          id="image-field"
                          className="form-control"
                          required
                          name="image"
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          Please select an Image
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
                  {editBanner && (
                    <form
                      className="tablelist-form"
                      autoComplete="off"
                      onSubmit={handleUpdate}
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
                            Banner Title
                          </label>
                          <input
                            type="text"
                            id="customername-field"
                            className="form-control"
                            placeholder="Enter Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
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
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a Link.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="status-field" className="form-label">
                            Status
                          </label>
                          <select
                            className="form-control"
                            data-trigger=""
                            name="status"
                            id="status-field"
                            value={formData.status}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Status</option>
                            <option value="Active">Active</option>
                            <option value="Block">Block</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="phone-field" className="form-label">
                            Place
                          </label>
                          <select
                            className="form-control"
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select place</option>
                            <option value="Home">Home </option>
                            <option value="AboutUs">AboutUs </option>
                            <option value="Blogs">Blogs </option>
                            <option value="gallery">gallery </option>
                            <option value="contact">contact </option>
                            <option value="associatedMembers">
                              associatedMembers
                            </option>
                            <option value="Aboutus">Aboutus </option>
                          </select>
                          <div className="invalid-feedback">
                            Please enter a place.
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
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            Please enter a phone.
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
                            Update Banner
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
