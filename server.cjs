const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage Engine for Multer
const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload"); // Directory for image uploads
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname); // Naming the file
  },
});

// File filter for Multer
const fileFilter = (req, file, cb) => {
  if (
    ["image/png", "image/jpg", "image/jpeg", "image/svg+xml"].includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PNG, JPG, JPEG, and SVG are allowed."),
      false
    );
  }
};

// Upload middleware
const upload = multer({
  storage: storageEngine,
  fileFilter: fileFilter,
  limits: { fileSize: 2000000 }, // 2MB limit
});

// Path to the mock database file
const dbPath = path.join(__dirname, "db.json");

// Function to read the database
const readDatabase = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));

// Function to save to the database
const saveToDatabase = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Function to get the next ID
const getNextId = () => {
  const db = readDatabase();
  const maxId = db.cars.reduce((max, car) => Math.max(car.id, max), 0);
  return maxId + 1;
};

// Routes
app.get("/cars", (req, res) => {
  const db = readDatabase();
  // Sort cars by ID in descending order
  const sortedCars = db.cars.sort((a, b) => b.id - a.id);
  res.json(sortedCars);
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
    createdAt: new Date().toISOString(), // Store creation date
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
    createdAt: db.cars[carIndex].createdAt, // Keep the original creation date
  };

  // Delete old image if a new one is uploaded
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

  // Delete image from server
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
