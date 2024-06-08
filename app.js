const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "./components/layout/main-layout");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
