import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Sidebar = () => (
  <div className="sidebar" style={{ marginLeft: "73.73px", marginTop: "72px" }}>
    <div className="fixed-sidebar" style={{ height: "inherit" }}>
      <a className="text-capitalize fw-bold mb-0 py-3 ps-4 d-block text-decoration-none">
        List Cars
      </a>
      <Link
        className="fw-bold mb-0 py-3 ps-4 d-block text-decoration-none fs-16"
        to="/"
      >
        List Car
      </Link>
    </div>
  </div>
);

export default Sidebar;
