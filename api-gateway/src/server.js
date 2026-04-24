require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ service: "api-gateway", status: "ok" });
});

const proxyOptions = (target) => ({
  target,
  changeOrigin: true,
  pathRewrite: { "^/api": "" },
});

app.use("/api/patients", createProxyMiddleware(proxyOptions(process.env.PATIENT_SERVICE_URL)));
app.use("/api/doctors", createProxyMiddleware(proxyOptions(process.env.DOCTOR_SERVICE_URL)));
app.use(
  "/api/appointments",
  createProxyMiddleware(proxyOptions(process.env.APPOINTMENT_SERVICE_URL))
);
app.use(
  "/api/notifications",
  createProxyMiddleware(proxyOptions(process.env.NOTIFICATION_SERVICE_URL))
);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
