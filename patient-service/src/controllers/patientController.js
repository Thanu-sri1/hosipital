const catchAsync = require("../utils/catchAsync");
const {
  getPatientById,
  updatePatientById,
} = require("../services/patientService");

const getProfile = catchAsync(async (req, res) => {
  const patient = await getPatientById(req.user.id);
  res.json({ patient });
});

const updateProfile = catchAsync(async (req, res) => {
  const allowedUpdates = ["name", "phone", "age", "gender"];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedUpdates.includes(key))
  );
  const patient = await updatePatientById(req.user.id, updates);
  res.json({ message: "Profile updated successfully", patient });
});

const validatePatient = catchAsync(async (req, res) => {
  const patient = await getPatientById(req.params.id);
  res.json({ exists: true, patient });
});

module.exports = {
  getProfile,
  updateProfile,
  validatePatient,
};
