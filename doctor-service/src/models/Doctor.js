const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    timeSlots: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    availableSlots: {
      type: [slotSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
