import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const CarCard = ({ car, handleDelete }) => {
  const date = new Date(car.updatedAt);

  return (
    <div className="card mb-3 shadow-sm">
      <img src={car.image} className="card-img-top" alt="Car Image" />
      <div className="card-body">
        <h5 className="card-title">
          {car.name} / {car.type}
        </h5>
        <p className="card-text">Rp {car.rentPrice / 1000}.000 / hari</p>
        <p className="card-text">
          <small className="text-muted">
            Updated at {date.getDate()}{" "}
            {date.toLocaleString(undefined, {
              month: "short",
              year: "numeric",
            })}
            ,{" "}
            {date.toLocaleTimeString(undefined, {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </p>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-danger"
            onClick={() => handleDelete(car.id)}
          >
            <img className="me-2" src="/images/fi_trash-2.png" alt="delete" />
            Delete
          </button>
          <Link to={`/cars/edit/${car.id}`} className="btn btn-success">
            <img className="me-2" src="/images/fi_edit.png" alt="edit" />
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
