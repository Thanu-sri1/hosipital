const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ service: "patient-service", status: "ok" });
});

app.use("/patients", authRoutes);
app.use("/patients", patientRoutes);

app.use(errorHandler);

module.exports = app;
