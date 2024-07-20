/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/newimage/Compliance logo.jpeg";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { Baseurl } from "../../Confige";
import Swal from "sweetalert2";
function Header() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/Login");
    }
  });
  const handleConfirmLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out from your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout",
        cancelButtonText: "No, stay logged in",
      });

      if (result.isConfirmed) {
        // Make an API call to logout
        await fetch(Baseurl + "/api/v1/admin/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Clear local storage
        localStorage.clear();

        // Clear cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });

        // Redirect to the login page or home page
        window.location.href = "/Login";
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <>
      <div id="layout-wrapper">
        <header id="page-topbar">
          <div className="layout-width">
            <div className="navbar-header">
              <div className="d-flex">
                <div className="navbar-brand-box horizontal-logo">
                  <Link to="/" className="logo logo-dark">
                    <span className="logo-sm">
                      <img src={logo} alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                      <img src={logo} alt="" height="17" />
                    </span>
                  </Link>

                  <Link to="/" className="logo logo-light">
                    <span className="logo-sm">
                      <img src={logo} alt="" height="22" />
                    </span>
                    <span className="logo-lg">
                      <img src={logo} alt="" height="17" />
                    </span>
                  </Link>
                </div>

                <button
                  type="button"
                  className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                  id="topnav-hamburger-icon"
                >
                  <span className="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>

                <form className="app-search d-none d-md-block"></form>
              </div>

              <div className="d-flex align-items-center">
                <div className="dropdown d-md-none topbar-head-dropdown header-item">
                  <button
                    type="button"
                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                    id="page-header-search-dropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="bx bx-search fs-22"></i>
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                    aria-labelledby="page-header-search-dropdown"
                  >
                    <form className="p-3">
                      <div className="form-group m-0">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search ..."
                            aria-label="Recipient's username"
                          />
                          <button className="btn btn-primary" type="submit">
                            <i className="mdi mdi-magnify"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="dropdown ms-sm-3 header-item topbar-user">
                  <button
                    type="button"
                    className="btn"
                    id="page-header-user-dropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="d-flex align-items-center">
                      <img
                        className="rounded-circle header-profile-user"
                        src="https://themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg"
                        alt="Header Avatar"
                      />
                      <span className="text-start ms-xl-2">
                        <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                          Admin
                        </span>
                        <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                          Founder
                        </span>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome Admin</h6>
                    <Link className="dropdown-item" to="/Profile">
                      <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle">Profile</span>
                    </Link>

                    <div className="dropdown-divider"></div>

                    <Link className="dropdown-item" to="/Settings">
                      <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle">Settings</span>
                    </Link>
                    <Link className="dropdown-item" to="/Lock">
                      <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle">Lock screen</span>
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="#"
                      onClick={handleConfirmLogout}
                    >
                      <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                      <span className="align-middle" data-key="t-logout">
                        Logout
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Sidebar />
      </div>
    </>
  );
}

export default Header;
