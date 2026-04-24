const bcrypt = require("bcryptjs");
const Patient = require("../models/Patient");
const AppError = require("../utils/AppError");

const sanitizePatient = (patient) => ({
  id: patient._id,
  name: patient.name,
  email: patient.email,
  phone: patient.phone,
  age: patient.age,
  gender: patient.gender,
  createdAt: patient.createdAt,
  updatedAt: patient.updatedAt,
});

const registerPatient = async (payload) => {
  const existing = await Patient.findOne({ email: payload.email });
  if (existing) {
    throw new AppError("Patient already exists with this email", 409);
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const patient = await Patient.create({
    ...payload,
    password: hashedPassword,
  });

  return sanitizePatient(patient);
};

const loginPatient = async (email, password) => {
  const patient = await Patient.findOne({ email }).select("+password");
  if (!patient) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, patient.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  return sanitizePatient(patient);
};

const getPatientById = async (patientId) => {
  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new AppError("Patient not found", 404);
  }
  return sanitizePatient(patient);
};

const updatePatientById = async (patientId, updates) => {
  const patient = await Patient.findByIdAndUpdate(
    patientId,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  return sanitizePatient(patient);
};

module.exports = {
  registerPatient,
  loginPatient,
  getPatientById,
  updatePatientById,
};
