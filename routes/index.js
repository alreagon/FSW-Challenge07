var express = require("express");
var router = express.Router();
const CarControl = require("../controller/carController");

router.get("/", CarControl.getAllCars);

router.get("/cars/create", function (req, res, next) {
  res.render("cars/createCar", { url: req.url, title: "Add New Car" });
});
router.get("/cars/update/:id", CarControl.editCars);

router.use("/cars", require("./car"));

module.exports = router;
