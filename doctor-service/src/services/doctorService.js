const Doctor = require("../models/Doctor");
const AppError = require("../utils/AppError");

const createDoctor = async (payload) => Doctor.create(payload);

const updateDoctor = async (doctorId, payload) => {
  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    { $set: payload },
    { new: true, runValidators: true }
  );
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }
  return doctor;
};

const setAvailability = async (doctorId, availableSlots) => {
  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    { $set: { availableSlots } },
    { new: true, runValidators: true }
  );
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }
  return doctor;
};

const listDoctors = async (specialization) => {
  const filter = specialization
    ? { specialization: new RegExp(`^${specialization}$`, "i") }
    : {};
  return Doctor.find(filter).sort({ name: 1 });
};

const getDoctorById = async (doctorId) => {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }
  return doctor;
};

const validateSlot = async (doctorId, date, timeSlot) => {
  const doctor = await getDoctorById(doctorId);
  const schedule = doctor.availableSlots.find((slot) => slot.date === date);
  const isAvailable = Boolean(schedule && schedule.timeSlots.includes(timeSlot));
  return { doctor, isAvailable };
};

module.exports = {
  createDoctor,
  updateDoctor,
  setAvailability,
  listDoctors,
  getDoctorById,
  validateSlot,
};
