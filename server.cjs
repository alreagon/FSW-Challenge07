const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage Engine for Multer
const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload"); // directory
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PNG, JPG, JPEG, and SVG are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storageEngine,
  fileFilter: fileFilter,
  limits: { fileSize: 2000000 }, // 2MB
});

// Mock Database
const dbPath = path.join(__dirname, "db.json");
const readDatabase = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const saveToDatabase = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Get the next ID
const getNextId = () => {
  const db = readDatabase();
  const maxId = db.cars.reduce((max, car) => Math.max(car.id, max), 0);
  return maxId + 1;
};

// Routes
app.get("/cars", (req, res) => {
  const db = readDatabase();
  res.json(db.cars);
});

app.get("/cars/:id", (req, res) => {
  const db = readDatabase();
  const car = db.cars.find((car) => car.id == req.params.id);
  if (!car) return res.status(404).json({ error: "Car not found" });
  res.json(car);
});

app.post("/cars", upload.single("image"), (req, res) => {
  const db = readDatabase();
  const newCar = {
    id: getNextId(),
    name: req.body.name,
    rentPrice: req.body.rentPrice,
    type: req.body.type,
    image: `http://localhost:${PORT}/upload/${req.file.filename}`,
  };
  db.cars.push(newCar);
  saveToDatabase(db);
  res.status(201).json(newCar);
});

app.put("/cars/:id", upload.single("image"), (req, res) => {
  const db = readDatabase();
  const carIndex = db.cars.findIndex((car) => car.id == req.params.id);
  if (carIndex === -1) return res.status(404).json({ error: "Car not found" });

  const updatedCar = {
    ...db.cars[carIndex],
    name: req.body.name,
    rentPrice: req.body.rentPrice,
    type: req.body.type,
    image: req.file
      ? `http://localhost:${PORT}/upload/${req.file.filename}`
      : db.cars[carIndex].image,
  };

  if (req.file && db.cars[carIndex].image) {
    const oldImagePath = path.join(
      __dirname,
      "public",
      "upload",
      path.basename(db.cars[carIndex].image)
    );
    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
  }

  db.cars[carIndex] = updatedCar;
  saveToDatabase(db);
  res.json(updatedCar);
});

app.delete("/cars/:id", (req, res) => {
  const db = readDatabase();
  const carIndex = db.cars.findIndex((car) => car.id == req.params.id);
  if (carIndex === -1) return res.status(404).json({ error: "Car not found" });

  if (db.cars[carIndex].image) {
    const oldImagePath = path.join(
      __dirname,
      "public",
      "upload",
      path.basename(db.cars[carIndex].image)
    );
    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
  }

  db.cars.splice(carIndex, 1);
  saveToDatabase(db);
  res.status(204).end();
});

// Serve static files
app.use("/upload", express.static(path.join(__dirname, "public", "upload")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
