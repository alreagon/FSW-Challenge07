const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const uploadMiddleware = require("../middleware/upload");
const db = require("../db.json");

// Mock function to simulate JSON database interaction
const saveToDatabase = (data) => {
  fs.writeFileSync(
    path.join(__dirname, "../db.json"),
    JSON.stringify(data, null, 2)
  );
};

// Get all cars
router.get("/cars", (req, res) => {
  res.json(db.cars);
});

// Create a new car
router.post("/cars", uploadMiddleware, (req, res) => {
  const newCar = {
    id: Date.now(),
    name: req.body.name,
    rentPrice: req.body.rentPrice,
    type: req.body.type,
    image: `http://localhost:8000/upload/${req.file.filename}`,
  };
  db.cars.push(newCar);
  saveToDatabase(db);
  res.status(201).json(newCar);
});

// Update a car
router.put("/cars/:id", uploadMiddleware, (req, res) => {
  const carIndex = db.cars.findIndex((car) => car.id == req.params.id);
  if (carIndex === -1) return res.status(404).json({ error: "Car not found" });

  const updatedCar = {
    ...db.cars[carIndex],
    name: req.body.name,
    rentPrice: req.body.rentPrice,
    type: req.body.type,
    image: req.file
      ? `http://localhost:8000/upload/${req.file.filename}`
      : db.cars[carIndex].image,
  };

  if (req.file && db.cars[carIndex].image) {
    fs.unlink(
      path.join(__dirname, "../public", db.cars[carIndex].image),
      (err) => {
        if (err) console.error("Failed to delete old image:", err);
      }
    );
  }

  db.cars[carIndex] = updatedCar;
  saveToDatabase(db);
  res.json(updatedCar);
});

// Delete a car
router.delete("/cars/:id", (req, res) => {
  const carIndex = db.cars.findIndex((car) => car.id == req.params.id);
  if (carIndex === -1) return res.status(404).json({ error: "Car not found" });

  if (db.cars[carIndex].image) {
    fs.unlink(
      path.join(__dirname, "../public", db.cars[carIndex].image),
      (err) => {
        if (err) console.error("Failed to delete image:", err);
      }
    );
  }

  db.cars.splice(carIndex, 1);
  saveToDatabase(db);
  res.status(204).end();
});

module.exports = router;
