/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../Confige";

/* eslint-disable react/no-unescaped-entities */
function Profile() {
  const adminId = localStorage.getItem("adminId");

  const [adminProfile, setAdminProfile] = useState("");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        // Get accessToken from local storage
        const accessToken = localStorage.getItem("accessToken");

        // Make sure accessToken exists before making the fetch request
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        // Fetch admin profile with accessToken in headers
        const response = await fetch(
          `${Baseurl}/api/v1/admin/Profile?adminId=${adminId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include accessToken in Authorization header
              "Content-Type": "application/json",
              // Add other headers if needed
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAdminProfile(data.data);
        console.log(data.data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error or redirect to login page
      }
    };

    fetchAdminProfile();
    // Call the fetch function
  }, []);

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="position-relative mx-n4 mt-n4">
              <div className="profile-wid-bg profile-setting-img">
                <img
                  src="https://themesbrand.com/velzon/html/master/assets/images/profile-bg.jpg"
                  className="profile-wid-img"
                  alt=""
                />
              </div>
            </div>

            <div className="row">
              <div className="col-xxl-3">
                <div className="card  mt-4">
                  <div className="card-body p-4">
                    <div className="text-center">
                      <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                        <img
                          src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-1.jpg"
                          alt="adminnameimage"
                          className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        />
                      </div>
                      <h5 className="fs-16 mb-1">{adminProfile.username}</h5>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Info</h5>
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <th className="ps-0" scope="row">
                              Full Name :
                            </th>
                            <td className="text-muted">
                              {adminProfile.username}
                            </td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">
                              Mobile :
                            </th>
                            <td className="text-muted">
                              {adminProfile.phoneNumber}
                            </td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">
                              E-mail :
                            </th>
                            <td className="text-muted">{adminProfile.email}</td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">
                              Location :
                            </th>
                            <td className="text-muted">Noida</td>
                          </tr>
                          <tr>
                            <th className="ps-0" scope="row">
                              login Time
                            </th>
                            <td className="text-muted">
                              {adminProfile.loginTime}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-9">
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title mb-3">About</h5>
                    <p>{adminProfile.portfolioLink}</p>

                    <div className="row">
                      <div className="col-6 col-md-4">
                        <div className="d-flex mt-4">
                          <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                            <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                              <i className="ri-user-2-fill"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="mb-1">Designation :</p>
                            <h6 className="text-truncate mb-0">
                              {adminProfile.designation}
                            </h6>
                          </div>
                        </div>
                      </div>

                      <div className="col-6 col-md-4">
                        <div className="d-flex mt-4">
                          <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                            <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                              <i className="ri-global-line"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="mb-1">Website :</p>
                            <a href="#" className="fw-semibold">
                              {adminProfile.website}
                            </a>
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

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">© CTH </div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Design & Develop by Brandbell
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Profile;
