const express = require("express");
const helmet = require("helmet");
//const rateLimit = require('express-rate-limit');
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const connectToDb = require("./startup/db");

// Route files
const submissionRoute = require("./routes/data");

// Middlewares
const { errorHandler, unhandledRoutes } = require("./middlewares/error");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(mongoSanitize());
app.use(xss());

app.use("/uploads", express.static("uploads"));

// Mount routers

app.use("/api/v1/", submissionRoute);

console.log("$$$$$$$$$$$$$$$$$$&&&&&&&&&&&&&&&!!!!!!!!!!!!!!!!!!!!!!!!!!");

// Ping route for testing connection
app.get("/", (req, res) =>
  res.status(200).send("Hello world!, Welcome to Quiz Application")
);

// Not found route handler
app.use(unhandledRoutes);

// Global error handler
app.use(errorHandler);

connectToDb();

module.exports = app;
