import React, { Suspense, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/users/userController";
const ProfilePic = React.lazy(() => import("../pages/ProfilePic"));
import { Icon } from "./Icons";

  const navLinks = [
    { to: "/", label: "Home", icon: <Icon name="Home" /> },
    { to: "/collection", label: "Collection", icon: <Icon name="Collection" /> },
    { to: "/about", label: "About", icon: <Icon name="About" /> },
    { to: "/contact", label: "Contact", icon: <Icon name="Contact" /> },
  ];

const PLACEHOLDER_SUGGESTIONS = [
  "Creatine",
  "Protein",
  "Mass Gainer",
  "Pre-Workout",
  "Omega-3",
  "BCAA",
  "Multivitamin",
];

function NavBar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.users);
  const { cartItems } = useSelector((state) => state.carts);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDER_SUGGESTIONS[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(PLACEHOLDER_SUGGESTIONS[index]);
      index = (index + 1) % PLACEHOLDER_SUGGESTIONS.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchItem = query.trim();
    if (!searchItem) return;
    navigate(`/collection?query=${encodeURIComponent(searchItem)}`);
    setQuery("");
    setShowSearch(false);
  };

  const handleOnLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <header className="navbar navbar-light bg-white sticky-top shadow-sm py-2">
      <div className="container-fluid d-flex align-items-center flex-nowrap">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold text-dark fs-5 flex-shrink-0 me-2">
          Brother's <span style={{color: "#de2509"}} >Nutrition</span>
        </Link>

        {/* Search Icon */}
        <div className="d-flex align-items-center">

          {/* 🖥 Desktop Inline Search */}
          <div className="d-none d-lg-block ms-2">
              <input
                type="text"
                className="border bg-light rounded-3 px-3 py-2"
                placeholder={placeholder}
                value={query}
                onChange={(e) => {setQuery(e.target.value)}}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                autoFocus
                style={{
                  maxWidth: "300px",
                  transition: "all 0.3s ease-in-out",
                }}
              />
          </div>

          <button className="btn btn-transparent border-0 p-0 d-lg-none">
            <Icon
              name="Search"
              size={24}
              onClick={() => setShowSearch(true)}
            />
          </button>

          {/* 📱 Mobile Fullscreen Overlay */}
          {showSearch && (
            <div
              className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-white"
              style={{ zIndex: 1050 }}
            >
              {/* Mobile Search Form */}
              <form onSubmit={handleSearch} className="d-flex align-items-center px-2 mt-2 gap-2">
                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="btn btn-transparent border-0 p-0"
                  aria-label="Close search"
                >
                  <Icon name="ArrowLeft" color="black" className="fs-2" />
                </button>

                <input
                  type="text"
                  className="border-0 bg-light shadow-sm rounded-3 px-3 py-2 flex-grow-1"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  // autoFocus
                  aria-label="Search products"
                />

                <button type="submit" className="btn btn-light border-0">
                  <Icon name="Search" size={18} />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Mobile Toggle */}
        <button className="navbar-toggler border-0 d-lg-none flex-shrink-0"
          onClick={() => setIsOpen(true)}
          type="button"
          aria-controls="offcanvasMenu" >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop Menu */}
        <div className="d-none d-lg-flex align-items-center gap-3 ms-auto">
          <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
            {navLinks.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link px-3 fw-medium ${
                      isActive ? "text-danger" : "text-dark"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Cart */}
          {loggedInUser && (
            <Link to="/cart" className="position-relative text-dark">
              <Icon name="Cart" size={24} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger small">
                {cartItems?.length || 0}
              </span>
            </Link>
          )}

          <Suspense fallback={"Loading..."}>
            <ProfilePic />
          </Suspense>

          {/* Admin */}
          {loggedInUser?.role === "admin" && (
            <Link
              to="/admin"
              className="btn btn-sm btn-info rounded-pill px-3 d-flex align-items-center gap-1"
            >
              <Icon name="Admin" size={14} /> Admin
            </Link>
          )}

          {/* Account Dropdown */}
          {loggedInUser && (
            <div className="dropdown">
              <button
                className="btn btn-sm btn-outline-dark rounded-pill px-2 shadow-sm d-flex align-items-center gap-1 dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Icon name="User" size={18} /> Account
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg rounded-3 border-0 p-2">
                <li>
                  <Link
                    to="/change-password"
                    className="dropdown-item d-flex align-items-center fw-semibold gap-3 py-2 rounded"
                  >
                    <Icon name="Password" className="text-success fs-5" />
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/update-account/${loggedInUser?._id}`}
                    className="dropdown-item d-flex align-items-center fw-semibold gap-3 py-2 rounded"
                  >
                    <Icon name="Account" className="text-primary fs-5" />
                    Update Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="orders"
                    className="dropdown-item d-flex align-items-center gap-3 py-2 fw-semibold rounded"
                  >
                    <Icon name="Orders" className="text-warning fs-5" />
                    My Orders
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider my-2" />
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center gap-3 py-2 text-danger fw-semibold rounded"
                    onClick={handleOnLogout}
                  >
                    <Icon name="Logout" className="fs-5" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Offcanvas */}
      <div className={`offcanvas offcanvas-start w-75 d-lg-none ${isOpen ? "show" : ""}`} tabIndex="-1">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold">Menu</h5>
          <button type="button" className="btn-close text-reset" onClick={() => setIsOpen(false)} />
        </div>

        <div className="offcanvas-body d-flex flex-column gap-4 overflow-auto">
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 shadow-sm">
              <ProfilePic size={48} />
              <div>
                <h6 className="mb-0 fw-semibold">{loggedInUser?.name || "Guest User"}</h6>
                <small className="text-muted">{loggedInUser?.email || "Welcome to FOREVER"}</small>
              </div>
            </div>

            {loggedInUser && (
              <>
                <button
                  onClick={() => handleNavigate("/cart")}
                  className="btn btn-light rounded-pill d-flex align-items-center gap-2"
                >
                  <Icon name="Cart" /> Cart ({cartItems?.length || 0})
                </button>

                {loggedInUser?.role === "admin" && (
                  <button
                    onClick={() => handleNavigate("/admin")}
                    className="btn btn-info rounded-pill text-white d-flex align-items-center gap-2"
                  >
                    <Icon name="Admin" /> Admin
                  </button>
                )}

                <button
                  onClick={() => handleNavigate(`/update-account/${loggedInUser?._id}`)}
                  className="btn btn-light rounded-pill d-flex align-items-center gap-2"
                >
                  <Icon name="Account" /> Account
                </button>

                <button
                  onClick={() => handleNavigate(`/orders`)}
                  className="btn btn-light rounded-pill d-flex align-items-center gap-2"
                >
                  <Icon name="Orders" /> My Orders
                </button>

                <button
                  className="btn btn-outline-danger rounded-pill d-flex align-items-center gap-2"
                  onClick={handleOnLogout}
                >
                  <Icon name="Logout" /> Sign Out
                </button>
              </>
            )}
          </div>

          {/* Nav Links */}
          <ul className="navbar-nav text-start mt-3">
            {navLinks.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 fw-medium ${
                      isActive ? "bg-warning text-dark shadow-sm" : "text-dark"
                    }`
                  }
                >
                  {item.icon} {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && <div className="offcanvas-backdrop fade show" onClick={() => setIsOpen(false)} />}
    </header>
  );
}

export default NavBar;