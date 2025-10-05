import React, { Suspense, useState } from "react";
import { Link, Outlet } from "react-router-dom";
const AdminSidebar = React.lazy(() => import("./AdminSidebar"));
import { Icon } from "../component/Icons";

function Admin() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "auto" }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
        <Link to="/" className="navbar-brand fw-bold text-dark fs-5 flex-shrink-0 me-2">
          Brother's <span style={{color: "#de2509"}} >Nutrition</span>
        </Link>

        <Link to="/"
          className="d-inline-flex align-items-center gap-2 text-light text-decoration-none px-3 py-2 rounded-3 bg-dark shadow-sm"
        >
          <Icon name={"ArrowLeft"} className="fs-5" />
          Back
        </Link>

        {/* Mobile menu button */}
        <button className="btn btn-outline-dark d-md-none"
          onClick={() => setSidebarOpen(!sidebarOpen)} >
          <Icon name={"Menu"} size={24} />
        </button>
      </header>

      <div className="d-flex flex-grow-1 position-relative">
        {/* Sidebar */}
        <div
          className={`bg-light w-50 border-end d-flex flex-column p-3 ${
            sidebarOpen ? "d-flex position-fixed start-0 top-0 z-3" : "d-none d-md-flex"
          }`}
          style={{
            width: sidebarOpen ? "100vw" : "200px",
            height: sidebarOpen ? "100vh" : "auto",
            transition: "all 0.3s ease-in-out",
          }} >
          <Suspense fallback={"Loading"} >
          <AdminSidebar closeSidebar={() => setSidebarOpen(false)} />
          </Suspense>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)}
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-md-none"
          />
        )}

        {/* Main content */}
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;