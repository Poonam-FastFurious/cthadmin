/* eslint-disable react/no-unescaped-entities */

import { useEffect } from "react";
import { useState } from "react";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
defineElement(lottie.loadAnimation);
import logo from "../assets/newimage/Compliance logo.jpeg";
import { Link } from "react-router-dom";
function ForgotPassword() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentYear = currentDateTime.getFullYear();
  const currentTime = currentDateTime.toLocaleTimeString();
  return (
    <>
      <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>

          <div className="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1440 120"
            >
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
            </svg>
          </div>
        </div>

        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logo} alt="" height="80" />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">
                    Welcome Admin & Dashboard
                  </p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card mt-4">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Forgot Password?</h5>
                      <p className="text-muted">Reset password with velzon</p>

                      <lord-icon
                        src="https://cdn.lordicon.com/rhvddzym.json"
                        trigger="loop"
                        colors="primary:#0ab39c"
                        className="avatar-xl"
                        style={{ width: "150px", height: "150px" }}
                      ></lord-icon>
                    </div>

                    <div
                      className="alert border-0 alert-warning text-center mb-2 mx-2"
                      role="alert"
                    >
                      Enter your email and instructions will be sent to you!
                    </div>
                    <div className="p-2">
                      <form>
                        <div className="mb-4">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
                          />
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Send Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Wait, I remember my password...
                    <Link
                      to="/"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      Click here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0 text-muted">
                    &copy;
                    {currentYear}
                    Compliance Townhall. Design with
                    <i className="mdi mdi-heart text-danger"></i> by BrandBell
                    {currentTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ForgotPassword;
