const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const appointmentRoutes = require("./routes/appointmentRoutes");
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
  res.json({ service: "appointment-service", status: "ok" });
});

app.use("/appointments", appointmentRoutes);
app.use(errorHandler);

module.exports = app;
