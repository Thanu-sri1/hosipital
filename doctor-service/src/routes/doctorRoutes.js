const express = require("express");
const {
  addDoctor,
  editDoctor,
  updateAvailability,
  getDoctors,
  getDoctor,
  internalDoctor,
  internalValidateSlot,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/", getDoctors);
router.post("/", addDoctor);
router.get("/internal/:id", internalDoctor);
router.post("/internal/:id/validate-slot", internalValidateSlot);
router.get("/:id", getDoctor);
router.put("/:id", editDoctor);
router.put("/:id/availability", updateAvailability);

module.exports = router;
