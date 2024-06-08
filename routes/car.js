var express = require("express");
var router = express.Router();
const CarControl = require("../controller/carController");
const uploadCar = require("../middleware/upload");

// Client Side
router.get("/", CarControl.getAllCars);
router.post("/create", uploadCar, CarControl.addCars);
router.post("/update/:id", uploadCar, CarControl.updateCars);
router.get("/delete/:id", CarControl.deleteCars);

// API Side
router.get("/api/v1/cars", CarControl.getAllCars);
router.post("/api/v1/cars", uploadCar, CarControl.addCars);
router.put("/api/v1/cars/:id", uploadCar, CarControl.updateCars);
router.delete("/api/v1/cars/:id", CarControl.deleteCars);

module.exports = router;
