import React from "react";
import "../styles/style.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <div className="nav-logo me-2"></div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div
        className="collapse navbar-collapse d-flex justify-content-end"
        id="navbarNav"
      >
        <form className="d-flex me-4">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
        <div className="user-wrap d-flex align-items-center gap-3">
          <div className="user-icon px-3 py-2 rounded-circle bg-light text-dark">
            F
          </div>
          <p className="mb-0 fw-bold text-dark">Fadhli's Group</p>
          <img src="/images/Vector_down.png" alt="vector down" />
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
