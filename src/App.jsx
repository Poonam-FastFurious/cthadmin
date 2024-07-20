import "./App.css";

import "../src/assets/images/favicon.ico";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/icons.min.css";
import "../src/assets/css/app.min.css";
import "../src/assets/css/custom.min.css";
import Login from "./Authentication/Login";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ForgotPassword from "./Authentication/ForgotPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Header from "./Pages/Home/Header";
import Banner from "./Pages/Banner/Banner";
import Addblogs from "./Pages/Blogs/Addblogs";
import ListBlog from "./Pages/Blogs/ListBlog";
import Customer from "./Pages/Customer/Customer";
import Members from "./Pages/Associatemember/Members";
import Gallery from "./Pages/Gallery/Gallery";
import Profile from "./Pages/Settings/Profile";
import PrivacyPolicy from "./Pages/Settings/PrivacyPolicy";
import Termsandcondition from "./Pages/Settings/Termsandcondition";
import AddFAQ from "./Pages/Settings/AddFAQ";
import ProfileSettimgs from "./Pages/Settings/ProfileSettimgs";
import Lockscreen from "./Pages/Settings/Lockscreen";
import EditBlogs from "./Pages/Blogs/EditBlogs";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/Lock" element={<Lockscreen />} />
          <Route
            element={
              <>
                <Header /> <Outlet />
              </>
            }
          >
            <Route path="/" element={<Dashboard />}></Route>

            <Route path="/Banner" element={<Banner />} />
            <Route path="/AddBlogs" element={<Addblogs />} />
            <Route path="/Editblog/:id" element={<EditBlogs />} />
            <Route path="/Blogs" element={<ListBlog />} />
            <Route path="/Users" element={<Customer />} />
            <Route path="/Members" element={<Members />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/term-conditions" element={<Termsandcondition />} />
            <Route path="/FAQ" element={<AddFAQ />} />
            <Route path="/Settings" element={<ProfileSettimgs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
