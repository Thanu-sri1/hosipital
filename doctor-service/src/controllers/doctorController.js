const catchAsync = require("../utils/catchAsync");
const {
  createDoctor,
  updateDoctor,
  setAvailability,
  listDoctors,
  getDoctorById,
  validateSlot,
} = require("../services/doctorService");

const addDoctor = catchAsync(async (req, res) => {
  const doctor = await createDoctor(req.body);
  res.status(201).json({ message: "Doctor created successfully", doctor });
});

const editDoctor = catchAsync(async (req, res) => {
  const doctor = await updateDoctor(req.params.id, req.body);
  res.json({ message: "Doctor updated successfully", doctor });
});

const updateAvailability = catchAsync(async (req, res) => {
  const doctor = await setAvailability(req.params.id, req.body.availableSlots || []);
  res.json({ message: "Availability updated successfully", doctor });
});

const getDoctors = catchAsync(async (req, res) => {
  const doctors = await listDoctors(req.query.specialization);
  res.json({ doctors });
});

const getDoctor = catchAsync(async (req, res) => {
  const doctor = await getDoctorById(req.params.id);
  res.json({ doctor });
});

const internalDoctor = catchAsync(async (req, res) => {
  const doctor = await getDoctorById(req.params.id);
  res.json({ exists: true, doctor });
});

const internalValidateSlot = catchAsync(async (req, res) => {
  const result = await validateSlot(req.params.id, req.body.date, req.body.timeSlot);
  res.json(result);
});

module.exports = {
  addDoctor,
  editDoctor,
  updateAvailability,
  getDoctors,
  getDoctor,
  internalDoctor,
  internalValidateSlot,
};
