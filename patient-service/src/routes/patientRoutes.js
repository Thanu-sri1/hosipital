const express = require("express");
const {
  getProfile,
  updateProfile,
  validatePatient,
} = require("../controllers/patientController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/internal/:id/exists", validatePatient);

module.exports = router;
