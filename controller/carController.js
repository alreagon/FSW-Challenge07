const { Cars } = require("../models");
const fs = require("fs");
const path = require("path");

class CarController {
  static async addCars(req, res) {
    try {
      await Cars.create({
        name: req.body.name,
        rentPrice: req.body.rentPrice,
        type: req.body.type,
        image: `/upload/${req.file.filename}`,
      });
      res.status(200).json({ message: "Data berhasil ditambahkan" });
    } catch (err) {
      res.status(400).json({ message: "Gagal menambahkan data", error: err });
    }
  }

  static async getAllCars(req, res) {
    try {
      const result = await Cars.findAll();
      res.render("cars/index", { ListCars: result, url: "/", title: "" });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  static async editCars(req, res) {
    try {
      const result = await Cars.findByPk(req.params.id);
      res.render("cars/updateCar", {
        data: result,
        url: req.url,
        title: "Update Car",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }

  static async updateCars(req, res) {
    try {
      const car = await Cars.findByPk(req.params.id);
      const newImage = req.file ? `/upload/${req.file.filename}` : car.image;

      if (req.file && car.image) {
        fs.unlink(path.join(__dirname, "../public", car.image), (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }

      await Cars.update(
        {
          name: req.body.name,
          rentPrice: req.body.rentPrice,
          type: req.body.type,
          image: newImage,
        },
        { where: { id: req.params.id } }
      );

      res.status(200).json({ message: "Data berhasil diperbarui" });
    } catch (err) {
      res.status(400).json({ message: "Gagal memperbarui data", error: err });
    }
  }

  static async deleteCars(req, res) {
    try {
      const car = await Cars.findByPk(req.params.id);
      if (car) {
        fs.unlink(path.join(__dirname, "../public", car.image), (err) => {
          if (err) console.error("Failed to delete image:", err);
        });
        await Cars.destroy({ where: { id: req.params.id } });
        res.redirect("/");
      } else {
        res.status(400).json({ message: "Data not found!" });
      }
    } catch (err) {
      res.status(400).json({ message: "Failed to delete image", error: err });
    }
  }
}

module.exports = CarController;
