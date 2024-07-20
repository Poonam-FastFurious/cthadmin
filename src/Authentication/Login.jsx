/* eslint-disable react/no-unescaped-entities */

import { useEffect } from "react";
import { useState } from "react";
import logo from "../assets/newimage/Compliance logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Baseurl } from "../Confige";
function Login() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };
  const isEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const isEmailAddress = isEmail(usernameOrEmail);
      const payload = isEmailAddress
        ? { email: usernameOrEmail, password }
        : { username: usernameOrEmail, password };

      const response = await fetch(Baseurl + "/api/v1/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        const { accessToken, refreshToken, user } = data.data;

        // Store in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("adminId", user._id);

        // Store in cookies
        Cookies.set("accessToken", accessToken, { expires: 1 }); // 1 day expiration
        Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days expiration
        Cookies.set("adminId", user._id, { expires: 7 });

        // Redirect to the dashboard or another page
        navigate("/");
      } else {
        // Handle errors
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
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
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to Townhall.
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter usernameoremail"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                          />
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/forgotPassword" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                              onClick={handlePasswordToggle}
                            >
                              <i
                                className={`ri-eye${
                                  passwordVisible ? "" : "-off"
                                }-fill align-middle`}
                              ></i>
                            </button>
                          </div>
                        </div>
                        {error && (
                          <div className="alert alert-danger">{error}</div>
                        )}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Sign In
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">..............</h5>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
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

export default Login;
