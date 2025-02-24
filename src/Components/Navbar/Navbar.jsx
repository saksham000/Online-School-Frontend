import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../security/AuthContext";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import menu_icon from "../../assets/menu-icon.png";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Get username & role from localStorage
  const [username, setUsername] = useState(
    localStorage.getItem("loggedInUsername") || ""
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  // ✅ Ensure Navbar updates when user logs in/out
  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("loggedInUsername") || "");
      setUserRole(localStorage.getItem("userRole") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setSticky(window.scrollY > 70);
    });
  }, []);

  const toggleMenu = () => setMobileMenu(!mobileMenu);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("loggedInUsername");
    localStorage.removeItem("userRole");
    setUsername(""); // ✅ Reset username in state
    setUserRole(""); // ✅ Reset role in state
    navigate("/login");
    window.location.reload(); // ✅ Force navbar refresh
  };

  const getAccountLink = () => {
    if (userRole === "ADMIN") return "/myaccount-admin";
    if (userRole === "TEACHER") return "/myaccount-teacher";
    if (userRole === "STUDENT") return "/myaccount-student";
    return "/";
  };

  return (
    <>
      <nav
  className={`fixed top-0 w-full z-50 p-4 container h-20 ${
    sticky ? "bg-green-600 shadow-md" : "bg-green-700"
  }`}
>
  <div className="container mx-auto flex justify-between items-center">
    <img src={logo} alt="Logo" className="logo h-30 mt-0" />

    <ul className={`flex space-x-4 ${mobileMenu ? "" : "hidden md:flex"} items-center`}>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/">Program</a>
      </li>
      <li>
        <a href="/">About us</a>
      </li>
      <li>
        <a href="/">Campus</a>
      </li>
      <li>
        <a href="/">Testimonials</a>
      </li>

      {/* Authentication Links */}
      <li className="flex items-center"> {/* Added flex items-center */}
        {username ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="btn">
              {username} ⌄
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                <a
                  href={getAccountLink()}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  My Account
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="btn">
            Login
          </a>
        )}
      </li>
    </ul>

    <img
      src={menu_icon}
      alt="Menu"
      className="menu-icon md:hidden"
      onClick={toggleMenu}
    />
  </div>
</nav>

      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
