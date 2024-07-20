import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../Confige";

/* eslint-disable react/no-unescaped-entities */
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [blogscount, setBlogscount] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  const fetchUsers = () => {
    fetch(Baseurl + "/api/v1/user/alluser")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
        setUserCount(data.data.length); // Set the user count here
      })
      .catch((error) => console.error("Error fetching users:", error));
  };
  const fetchblogs = () => {
    fetch(Baseurl + "/api/v1/blog/allblogs")
      .then((response) => response.json())
      .then((data) => {
        const blogData = data.data;
        setBlogs(blogData);
        const total = blogData.reduce((acc, blog) => acc + blog.views, 0);
        setTotalViews(total);
        const totalCommentCount = blogData.reduce(
          (acc, blog) => acc + blog.comments.length,
          0
        );
        setTotalComments(totalCommentCount);
        setBlogscount(data.data.length); // Set the user count here
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers();
    fetchblogs();
  }, []);
  console.log(totalViews);
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="h-100">
                  <div className="row mb-3 pb-1">
                    <div className="col-12">
                      <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                          <h4 className="fs-16 mb-1">Good Morning, Admin</h4>
                          <p className="text-muted mb-0">
                            Here's what's happening with your store today.
                          </p>
                        </div>
                        <div className="mt-3 mt-lg-0">
                          <form>
                            <div className="row g-3 mb-0 align-items-center">
                              <div className="col-sm-auto">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control border-0 dash-filter-picker shadow"
                                    data-provider="flatpickr"
                                    data-range-date="true"
                                    data-date-format="d M, Y"
                                    data-deafult-date="01 Jan 2022 to 31 Jan 2022"
                                  />
                                  <div className="input-group-text bg-primary border-primary text-white">
                                    <i className="ri-calendar-2-line"></i>
                                  </div>
                                </div>
                              </div>

                              <div className="col-auto"></div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                Total users
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <h5 className="text-success fs-14 mb-0">
                                <i className="ri-arrow-right-up-line fs-13 align-middle"></i>
                                +16.24 %
                              </h5>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                <span
                                  className="counter-value"
                                  data-target="559.25"
                                >
                                  {userCount}
                                </span>
                              </h4>
                              <Link
                                to="/Users"
                                className="text-decoration-underline"
                              >
                                View all user
                              </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-warning-subtle rounded fs-3">
                                <i className="bx bx-user-circle text-warning"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                Total Blogs
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <h5 className="text-danger fs-14 mb-0">
                                <i className="ri-arrow-right-down-line fs-13 align-middle"></i>
                                -3.57 %
                              </h5>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                <span
                                  className="counter-value"
                                  data-target="36894"
                                >
                                  {blogscount}
                                </span>
                              </h4>
                              <Link
                                to="/Blogs"
                                className="text-decoration-underline"
                              >
                                View all Blogs
                              </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-info-subtle rounded fs-3">
                                <i className="bx bx-shopping-bag text-info"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                Total Read
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <h5 className="text-success fs-14 mb-0">
                                <i className="ri-arrow-right-up-line fs-13 align-middle"></i>
                                +29.08 %
                              </h5>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                <span
                                  className="counter-value"
                                  data-target="183.35"
                                >
                                  {totalViews}
                                </span>
                              </h4>
                              <Link to="" className="text-decoration-underline">
                                See details
                              </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-warning-subtle rounded fs-3">
                                <i className="bx  ri-mail-check-line text-warning"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                Total Comments
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <h5 className="text-muted fs-14 mb-0">+0.00 %</h5>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                <span
                                  className="counter-value"
                                  data-target="165.89"
                                >
                                  {totalComments}
                                </span>
                              </h4>
                              <Link to="" className="text-decoration-underline">
                                See Comments
                              </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-primary-subtle rounded fs-3">
                                <i className="bx bx-wallet text-primary"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Recent User</h4>
                  <div className="flex-shrink-0"></div>
                </div>

                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap table-striped-columns mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="cardtableCheck"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="cardtableCheck"
                              ></label>
                            </div>
                          </th>
                          <th scope="col">Id</th>
                          <th scope="col">Customer</th>
                          <th scope="col">Customer Email</th>
                          <th scope="col">Mobile</th>
                          <th scope="col">Join date</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={index}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="cardtableCheck01"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="cardtableCheck01"
                                ></label>
                              </div>
                            </td>
                            <td>
                              <Link to="#" className="fw-semibold">
                                #{user._id}
                              </Link>
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.emailAddress}</td>
                            <td>{user.contactNumber}</td>
                            <td>
                              <span className="badge bg-success">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-light"
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card card-height-100">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Popular Blogs</h4>
                  <div className="flex-shrink-0">
                    <div className="dropdown card-header-dropdown">
                      <Link className="text-reset dropdown-btn" to="/Blogs">
                        <span className="text-muted">
                          <i className="mdi mdi-chevron-down ms-1"></i> View
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table table-centered table-hover align-middle table-nowrap mb-0">
                      <tbody>
                        {blogs.map((blog, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 me-2">
                                  <img
                                    src={blog.image}
                                    alt=""
                                    className="avatar-sm p-2"
                                  />
                                </div>
                                <div>
                                  <h5 className="fs-14 my-1 fw-medium">
                                    <div className="text-reset">
                                      {blog.title}
                                    </div>
                                  </h5>
                                  <span className="text-muted">
                                    {new Date(
                                      blog.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h5 className="fs-14 mb-0">
                                {blog.comments.length}
                                <i className="bx bx-heart text-success fs-16 align-middle ms-2"></i>
                              </h5>
                            </td>
                            <td>
                              <h5 className="fs-14 mb-0">
                                {blog.views}
                                <i className=" ri-book-open-fill text-success fs-16 align-middle ms-2"></i>
                              </h5>
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

export default Dashboard;
