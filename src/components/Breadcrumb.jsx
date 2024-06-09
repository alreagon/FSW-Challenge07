import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/style.css";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbPaths = {
    "": "List Cars",
    create: "Add New Car",
    edit: "Update Car",
  };

  return (
    <div className="breadcrumb d-flex align-items-center gap-2">
      <span className="fs-12 fw-bold">Cars</span>
      <img src="/images/Vector_right.png" alt="breadcrumb arrow" />
      <Link to="/" className="fs-12 text-decoration-none text-black">
        List Cars
      </Link>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const pathLabel = breadcrumbPaths[value] || value;

        return (
          <React.Fragment key={to}>
            {!isLast ? (
              <React.Fragment>
                <img src="/images/Vector_right.png" alt="breadcrumb arrow" />
                <Link to={to} className="fs-12 text-decoration-none text-black">
                  {pathLabel}
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <img src="/images/Vector_right.png" alt="breadcrumb arrow" />
                <span className="active fs-12">{pathLabel}</span>
              </React.Fragment>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
