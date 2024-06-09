import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const MenuBar = () => (
  <div className="col-md-1 col-lg-1 col-xl-1 px-0">
    <div className="fixed-menu h-100 position-fixed py-3 px-0">
      <div className="logo m-auto"></div>
      <div className="menu-wrap mt-3">
        <div className="menu d-flex flex-column align-items-center p-2 justify-content-center">
          <img src="/images/group_2.png" alt="Home" />
          <p className="fs-12 text-white mb-0">Dashboard</p>
        </div>
        <div className="menu d-flex flex-column align-items-center p-2 justify-content-center">
          <img src="/images/fi_truck.png" alt="Truck" />
          <p className="fs-12 text-white mb-0 fw-bold">Cars</p>
        </div>
      </div>
    </div>
  </div>
);

export default MenuBar;
