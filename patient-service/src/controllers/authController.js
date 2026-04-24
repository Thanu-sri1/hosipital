const catchAsync = require("../utils/catchAsync");
const { signToken } = require("../services/tokenService");
const { registerPatient, loginPatient } = require("../services/patientService");

const register = catchAsync(async (req, res) => {
  const patient = await registerPatient(req.body);
  const token = signToken({ id: patient.id, email: patient.email, role: "patient" });

  res.status(201).json({
    message: "Patient registered successfully",
    token,
    patient,
  });
});

const login = catchAsync(async (req, res) => {
  const patient = await loginPatient(req.body.email, req.body.password);
  const token = signToken({ id: patient.id, email: patient.email, role: "patient" });

  res.json({
    message: "Login successful",
    token,
    patient,
  });
});

module.exports = { register, login };
