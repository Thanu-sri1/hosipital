const express = require("express");
const {
  book,
  cancel,
  mine,
  doctorAppointments,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book", protect, book);
router.get("/mine", protect, mine);
router.get("/doctor/:doctorId", doctorAppointments);
router.delete("/:id", protect, cancel);

module.exports = router;
