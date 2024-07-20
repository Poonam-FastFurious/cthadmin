import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Baseurl } from "../../Confige";
import Swal from "sweetalert2";

function Sidebar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);
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
    <div id="layout-wrapper">
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img
                src="https://complaincetownhall.brandbell.in/assets/logo-no-background-CLjwZW5M.png"
                alt=""
                height="22"
              />
            </span>
            <span className="logo-lg">
              <img
                src="https://complaincetownhall.brandbell.in/assets/logo-no-background-CLjwZW5M.png"
                alt=""
                height="50"
              />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img
                src="https://complaincetownhall.brandbell.in/assets/logo-no-background-CLjwZW5M.png"
                alt=""
                height="22"
              />
            </span>
            <span className="logo-lg">
              <img
                src="https://complaincetownhall.brandbell.in/assets/logo-no-background-CLjwZW5M.png"
                alt=""
                height="17"
              />
            </span>
          </Link>
          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title">
                <span data-key="t-menu">Menu</span>
              </li>
              <li className="nav-item">
                <Link
                  style={{
                    backgroundColor: activeTab === "/" ? "#CA9352" : "",
                    color: activeTab === "/" ? "white" : "",
                    borderRadius: "6px",
                  }}
                  className="nav-link menu-link"
                  to="/"
                >
                  <i className="ri-dashboard-2-line"></i>
                  <span data-key="t-dashboards">Dashboards</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="#sidebarApps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                >
                  <i className="ri-apps-2-line"></i>
                  <span data-key="t-apps">Banner</span>
                </Link>
                <div className="collapse menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/Banner"
                        className="nav-link"
                        data-key="t-chat"
                        style={{
                          backgroundColor:
                            activeTab === "/Banner" ? "#CA9352" : "",
                          color: activeTab === "/Banner" ? "white" : "",
                          borderRadius: "6px",
                        }}
                      >
                        Manage Banner
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="#blogssidebarApps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="blogssidebarAppss"
                >
                  <i className="ri-apps-2-line"></i>
                  <span data-key="t-apps">Blogs</span>
                </Link>
                <div className="collapse menu-dropdown" id="blogssidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/Addblogs"
                        className="nav-link"
                        data-key="t-chat"
                        style={{
                          backgroundColor:
                            activeTab === "/Addblogs" ? "#CA9352" : "",
                          color: activeTab === "/Addblogs" ? "white" : "",
                          borderRadius: "6px",
                        }}
                      >
                        Add Blogs
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/Blogs"
                        className="nav-link"
                        data-key="t-chat"
                        style={{
                          backgroundColor:
                            activeTab === "/Blogs" ? "#CA9352" : "",
                          color: activeTab === "/Blogs" ? "white" : "",
                          borderRadius: "6px",
                        }}
                      >
                        Manage Blogs
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/Gallery"
                  style={{
                    backgroundColor: activeTab === "/Gallery" ? "#CA9352" : "",
                    color: activeTab === "/Gallery" ? "white" : "",
                    borderRadius: "6px",
                  }}
                >
                  <i className="ri-honour-line"></i>
                  <span data-key="t-widgets">Gallery </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/Members"
                  style={{
                    backgroundColor: activeTab === "/Members" ? "#CA9352" : "",
                    color: activeTab === "/Members" ? "white" : "",
                    borderRadius: "6px",
                  }}
                >
                  <i className="ri-honour-line"></i>
                  <span data-key="t-widgets">Associate member </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/Users"
                  style={{
                    backgroundColor: activeTab === "/Users" ? "#CA9352" : "",
                    color: activeTab === "/Users" ? "white" : "",
                    borderRadius: "6px",
                  }}
                >
                  <i className="ri-honour-line"></i>
                  <span data-key="t-widgets">Users </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="#settingsidebarApps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="settingsidebarApps"
                >
                  <i className="ri-apps-2-line"></i>
                  <span data-key="t-apps">Settings</span>
                </Link>
                <div className="collapse menu-dropdown" id="settingsidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/PrivacyPolicy"
                        className="nav-link"
                        data-key="t-chat"
                        style={{
                          backgroundColor:
                            activeTab === "/PrivacyPolicy" ? "#CA9352" : "",
                          color: activeTab === "/PrivacyPolicy" ? "white" : "",
                          borderRadius: "6px",
                        }}
                      >
                        PrivacyPolicy
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/term-conditions"
                        className="nav-link"
                        data-key="t-chat"
                        style={{
                          backgroundColor:
                            activeTab === "/term-conditions" ? "#CA9352" : "",
                          color:
                            activeTab === "/term-conditions" ? "white" : "",
                          borderRadius: "6px",
                        }}
                      >
                        Terms&condition
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/FAQ"
                        className="nav-link"
                        data-key="t-chat"
                        style={{
                          backgroundColor:
                            activeTab === "/FAQ" ? "#CA9352" : "",
                          color: activeTab === "/FAQ" ? "white" : "",
                          borderRadius: "6px",
                        }}
                      >
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item" onClick={handleConfirmLogout}>
                <Link className="nav-link menu-link" to="#">
                  <i className="ri-honour-line"></i>
                  <span data-key="t-widgets">LogOut </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-background"></div>
      </div>
    </div>
  );
}

export default Sidebar;
