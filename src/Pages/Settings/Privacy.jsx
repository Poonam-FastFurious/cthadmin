import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { Baseurl } from "../../Confige";

function Privacy() {
  // Fetch testimonials
  const [privacyPolicies, setPrivacyPolicies] = useState([]);

  useEffect(() => {
    // Fetch privacy policy data from the API
    fetch(Baseurl + "/api/v1/privacy")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          // Store the privacy policies with their main ids
          setPrivacyPolicies(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching privacy policy:", error);
      });
  }, []);

  const deletePrivacyPolicy = async (id) => {
    try {
      // Confirm the deletion with the user
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this Privacy Policy!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // Send delete request to the backend
        const response = await fetch(Baseurl + "/api/v1/privacy/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }), // Pass the id of the privacy policy to delete
        });

        if (!response.ok) {
          throw new Error("Failed to delete Privacy Policy");
        }

        // After successful deletion, update the list of privacy policies
        // Assuming you have a state or a function to refresh the list
        const updatedPrivacyPolicies = privacyPolicies.filter(
          (policy) => policy._id !== id
        );
        setPrivacyPolicies(updatedPrivacyPolicies);

        // Show success message
        Swal.fire(
          "Deleted!",
          "Your Privacy Policy has been deleted.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error deleting Privacy Policy:", error);
      Swal.fire("Error", "Failed to delete privacy policy.", "error");
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Privacy</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">CTH</Link>
                      </li>
                      <li className="breadcrumb-item active">Privacy</li>
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
                        <h5 className="card-title mb-0">Privacy</h5>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex gap-1 flex-wrap">
                          <Link
                            to="/Addprivacy"
                            type="button"
                            className="btn btn-info"
                          >
                            <i className="ri-file-download-line align-bottom me-1"></i>
                            Add Privacy
                          </Link>
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
                          <th scope="col">Title</th>
                          {/* <th scope="col">Content</th> */}
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {privacyPolicies.map((section, index) => (
                          <tr key={section._id}>
                            <th scope="row">{index + 1}</th>
                            {section.sections
                              .map((section) => section.title)
                              .join(", ")}
                            {/* <td
                              dangerouslySetInnerHTML={{
                                __html: section.content,
                              }}
                            /> */}
                            <td>
                              <div className="hstack gap-3 flex-wrap">
                                <Link
                                  className="link-danger fs-15"
                                  onClick={() =>
                                    deletePrivacyPolicy(section._id)
                                  }
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Privacy;
