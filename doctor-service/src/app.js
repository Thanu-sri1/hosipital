const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const doctorRoutes = require("./routes/doctorRoutes");
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
  res.json({ service: "doctor-service", status: "ok" });
});

app.use("/doctors", doctorRoutes);
app.use(errorHandler);

module.exports = app;
