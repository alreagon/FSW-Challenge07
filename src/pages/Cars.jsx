import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/style.css";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filter, setFilter] = useState("All");
  const baseURL = "http://localhost:8000";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${baseURL}/cars`);
        const data = await response.json();
        // Sort cars by ID in descending order
        const sortedCars = data.sort((a, b) => b.id - a.id);
        setCars(sortedCars);
        setFilteredCars(sortedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (confirmed) {
      try {
        await fetch(`${baseURL}/cars/${id}`, {
          method: "DELETE",
        });
        const updatedCars = cars.filter((car) => car.id !== id);
        setCars(updatedCars);
        setFilteredCars(updatedCars);
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("Failed to delete the car. Please try again.");
      }
    }
  };

  const handleFilter = (type) => {
    setFilter(type);
    if (type === "All") {
      setFilteredCars(cars);
    } else {
      setFilteredCars(cars.filter((car) => car.type === type));
    }
  };

  return (
    <div className="list-cars-page" style={{ padding: "32px" }}>
      <Breadcrumb />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="main-title fs-20 m-0 fw-bold">List Car</h1>
        <Link to="/create" className="btn btn-primary">
          <img className="me-2" src="/images/fi_plus.png" alt="plus" />
          Add New Car
        </Link>
      </div>
      <div className="row">
        <div className="filter d-flex gap-3 my-4">
          <button
            className={`btn ${
              filter === "All" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => handleFilter("All")}
          >
            All
          </button>
          <button
            className={`btn ${
              filter === "Small" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => handleFilter("Small")}
          >
            Small
          </button>
          <button
            className={`btn ${
              filter === "Medium" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => handleFilter("Medium")}
          >
            Medium
          </button>
          <button
            className={`btn ${
              filter === "Large" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => handleFilter("Large")}
          >
            Large
          </button>
        </div>
      </div>
      <div className="cars-container">
        <div className="row">
          {filteredCars.map((car) => (
            <div className="col-md-4 mt-4" key={car.id}>
              <div className="card">
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
                          Updated at {new Date(car.createdAt).getDate()}{" "}
                          {new Date(car.createdAt).toLocaleString(undefined, {
                            month: "short",
                            year: "numeric",
                          })}
                          ,{" "}
                          {new Date(car.createdAt).toLocaleTimeString(
                            undefined,
                            { hour12: true, hour: "2-digit", minute: "2-digit" }
                          )}
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
                        alt="trash icon"
                      />
                      Delete
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      style={{ width: "100%" }}
                      className="edit_btn font-weight-bold btn btn-success btn-outline-success d-flex align-items-center justify-content-center text-white me-0"
                      onClick={() => navigate(`/edit/${car.id}`)}
                    >
                      <img
                        className="me-2"
                        src="/images/fi_edit.png"
                        alt="edit icon"
                      />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
