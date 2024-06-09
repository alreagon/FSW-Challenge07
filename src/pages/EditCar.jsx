import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/style.css";

const EditCar = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const baseURL = "http://localhost:8000";

  useEffect(() => {
    const fetchCar = async () => {
      const response = await fetch(`${baseURL}/cars/${id}`);
      const data = await response.json();
      setName(data.name);
      setRentPrice(data.rentPrice);
      setType(data.type);
      setImagePreview(data.image);
    };

    fetchCar();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = {
      name,
      rentPrice,
      type,
      image: image ? URL.createObjectURL(image) : imagePreview,
    };

    try {
      const response = await fetch(`${baseURL}/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to update the car. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Failed to update the car. Please check your network connection and try again."
      );
    }
  };

  return (
    <div className="edit-car-page" style={{ padding: "32px" }}>
      <Breadcrumb />
      <h1 className="main-title fs-20 m-0 fw-bold mt-3 mb-3">Update Car</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-card py-3 px-3 mt-3">
          <div className="row">
            <label className="form-label col-md-2 fs-12 col-form-label d-flex align-items-center">
              Nama<span>&#42;</span>
            </label>
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Avanza"
                style={{ width: "400px" }}
                required
              />
            </div>
          </div>
          <div className="row mt-3">
            <label className="form-label col-md-2 fs-12 col-form-label d-flex align-items-center">
              Sewa Per Hari<span>&#42;</span>
            </label>
            <div className="col-md-10">
              <input
                type="number"
                className="form-control"
                id="rentPrice"
                name="rentPrice"
                value={rentPrice}
                onChange={(e) => setRentPrice(e.target.value)}
                placeholder="Rp 0,-"
                style={{ width: "400px" }}
                required
              />
            </div>
          </div>
          <div className="row mt-3">
            <label className="form-label col-md-2 fs-12 col-form-label d-flex align-items-center">
              Ukuran<span>&#42;</span>
            </label>
            <div className="col-md-10">
              <select
                name="type"
                className="form-select"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ width: "400px" }}
                required
              >
                <option value="">Pilih Ukuran</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <label className="form-label col-md-2 fs-12 col-form-label d-flex">
              Foto<span>&#42;</span>
            </label>
            <div className="col-md-10">
              <div className="input-group" style={{ width: "400px" }}>
                <input
                  className="form-control"
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  style={{ height: "32px" }}
                />
                <span
                  className="input-group-text"
                  style={{ width: "50px", height: "32px" }}
                >
                  <i
                    className="bi bi-upload"
                    style={{ width: "50px", height: "24px" }}
                  ></i>
                </span>
              </div>
              <div id="fileHelp" className="form-text">
                File size max. 2MB dan tipe file harus PNG, JPG, JPEG, atau SVG.
              </div>
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="img-thumbnail"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
