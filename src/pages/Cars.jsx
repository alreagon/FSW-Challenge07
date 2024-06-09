import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("All");
  const baseURL = "http://localhost:8000";

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch(`${baseURL}/cars`);
      const data = await response.json();
      setCars(data);
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const response = await fetch(`${baseURL}/cars/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setCars(cars.filter((car) => car.id !== id));
        } else {
          alert("Failed to delete the car. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          "Failed to delete the car. Please check your network connection and try again."
        );
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    })}, ${date.toLocaleTimeString("default", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const filteredCars =
    filter === "All" ? cars : cars.filter((car) => car.type === filter);

  return (
    <div className="cars-container">
      <h1 className="main-title fs-20 m-0 fw-bold">List Car</h1>
      <div className="breadcrumb d-flex align-items-center gap-2">
        <span className="fs-12 fw-bold">Cars</span>
        <img src="/images/Vector_right.png" alt="Breadcrumb icon" />
        <span className="active fs-12">List Car</span>
      </div>
      <div className="d-flex justify-content-end mb-4">
        <Link to="/create" className="btn btn-primary">
          <img src="/images/fi_plus.png" alt="Add icon" />
          Add New Car
        </Link>
      </div>
      <div className="row">
        <div className="filter d-flex gap-3 my-4">
          <button
            className={`btn ${
              filter === "All"
                ? "btn-outline-primary active"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`btn ${
              filter === "Small"
                ? "btn-outline-primary active"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFilter("Small")}
          >
            Small
          </button>
          <button
            className={`btn ${
              filter === "Medium"
                ? "btn-outline-primary active"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFilter("Medium")}
          >
            Medium
          </button>
          <button
            className={`btn ${
              filter === "Large"
                ? "btn-outline-primary active"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFilter("Large")}
          >
            Large
          </button>
        </div>
      </div>
      <div className="row">
        {filteredCars.map((car) => (
          <div className="col-md-4" key={car.id}>
            <div className="card mb-4">
              <img src={car.image} className="card-img" alt="Car Image" />
              <div className="card-body p-0">
                <h5 className="card-title mt-3 mb-1 fs-14">
                  {car.name} / {car.type}
                </h5>
                <p className="card-harga mb-1 fs-16 fw-bold">
                  Rp {car.rentPrice} / hari
                </p>
                <div className="card-info mt-3">
                  <div className="info">
                    <p className="clock d-flex fs-14">
                      <img
                        className="me-2"
                        src="/images/fi_clock.png"
                        alt="clock icon"
                      />
                      <span className="ml-2">
                        Updated at {formatDate(car.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <button
                    style={{ width: "100%" }}
                    className="delete_btn font-weight-bold btn btn-outline-danger d-flex align-items-center justify-content-center"
                    onClick={() => handleDelete(car.id)}
                  >
                    <img
                      className="me-2"
                      src="/images/fi_trash-2.png"
                      alt="Delete icon"
                    />
                    Delete
                  </button>
                </div>
                <div className="col-md-6">
                  <Link
                    to={`/edit/${car.id}`}
                    className="edit_btn font-weight-bold btn btn-success btn-outline-success d-flex align-items-center justify-content-center text-white me-0"
                    style={{ width: "100%" }}
                  >
                    <img
                      className="me-2"
                      src="/images/fi_edit.png"
                      alt="Edit icon"
                    />
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
