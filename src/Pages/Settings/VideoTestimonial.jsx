import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Swal from "sweetalert2";
import { Baseurl } from "../../Confige";

function VideoTestimonial() {
  const [modalVisible, setModalVisible] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [heading, setHeading] = useState("");
  const [details, setDetails] = useState("");

  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const response = await fetch(Baseurl + "/api/v1/videotestimonial");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTestimonials(data.data); // Assuming response.data is an array of testimonials
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle showing modal
  const handleAddClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Handle file input change

  // Handle message change and validation
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setDetails(value);

    if (value.length < 200) {
      setMessageError("Details must be at least 200 characters long.");
    } else {
      setMessageError("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate details length
    if (details.length < 200) {
      setMessageError("Details must be at least 200 characters long.");
      return;
    } else {
      setMessageError("");
    }

    // Prepare testimonial data as JSON
    const testimonialData = {
      heading,
      details,
      videoUrl,
    };

    setLoading(true);

    try {
      const response = await fetch(Baseurl + "/api/v1/videotestimonial/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonialData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Testimonial added successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setHeading("");
            setDetails("");
            setVideoUrl("");
            handleCloseModal();
            fetchTestimonials();
          },
        });
      } else {
        throw new Error("Testimonial creation failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Testimonial creation failed", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle testimonial deletion
  const deleteTestimonial = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this testimonial!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(Baseurl + "/api/v1/videotestimonial/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }), // Pass the id of the testimonial to delete in the request body
        });

        if (!response.ok) {
          throw new Error("Failed to delete testimonial");
        }

        // After successful deletion, fetch testimonials again to update the list
        const updatedTestimonials = testimonials.filter(
          (test) => test._id !== id
        );
        setTestimonials(updatedTestimonials);

        // Show success message
        Swal.fire("Deleted!", "Your testimonial has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      Swal.fire("Error", "Failed to delete testimonial.", "error");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Founder Story</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">CTH </Link>
                      </li>
                      <li className="breadcrumb-item active">Founder Story</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card" id="orderList">
                  <div className="card-header border-0">
                    <div className="row align-items-center gy-3">
                      <div className="col-sm">
                        <h5 className="card-title mb-0">Founder Story</h5>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex gap-1 flex-wrap">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={handleAddClick}
                          >
                            <i className="ri-file-download-line align-bottom me-1"></i>
                            Add Testimonial
                          </button>
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

                  <div
                    className="mt-2"
                    style={{ marginTop: "25px", backgroundColor: "white" }}
                  >
                    <table className="table table-striped align-middle table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Heading</th>
                          <th scope="col">Details</th>
                          <th scope="col">Video</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testimonials.map((test, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{test.heading}</td>
                            <td
                              className="details-cell"
                              style={{
                                whiteSpace: "pre-wrap",
                                overflow: "hidden",
                                width: "450px",
                              }}
                            >
                              {test.details}
                            </td>

                            <td className="customer_name">
                              <div className="flex-shrink-0 me-2">
                                {test.videoUrl ? (
                                  <iframe
                                    width="200"
                                    height="150"
                                    src={`https://www.youtube.com/embed/${new URL(
                                      test.videoUrl
                                    ).searchParams.get("v")}`}
                                    title="YouTube video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                ) : (
                                  <p>No video available</p>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="hstack gap-3 flex-wrap">
                                <Link
                                  className="link-danger fs-15"
                                  onClick={() => deleteTestimonial(test._id)}
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {modalVisible && (
              <div
                className="modal fade show"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header bg-light p-3">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Add Testimonial
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleCloseModal}
                        aria-label="Close"
                      ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                            Video Url (Youtube only)
                          </label>
                          <input
                            type="text"
                            id="customername-field"
                            className="form-control"
                            placeholder="Enter Video Url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="customeremail-field"
                            className="form-label"
                          >
                            Heading
                          </label>
                          <input
                            type="text"
                            id="customeremail-field"
                            className="form-control"
                            placeholder="Enter heading"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="message-field" className="form-label">
                            Message
                          </label>
                          <textarea
                            id="message-field"
                            className="form-control"
                            placeholder="Enter testimonial message"
                            value={details}
                            onChange={handleMessageChange}
                            required
                            minLength="200" // Set minimum length here
                            maxLength="250" // Set maximum length here
                          />
                          <div className="form-text">
                            {details.length}/250 characters
                            {messageError && (
                              <div className="text-danger">{messageError}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={handleCloseModal}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? (
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoTestimonial;
