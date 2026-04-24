const Doctor = require("../models/Doctor");

const doctors = [
  {
    name: "Dr. Amelia Carter",
    specialization: "Cardiology",
    experience: 12,
    availableSlots: [
      { date: "2026-04-25", timeSlots: ["09:00", "10:00", "11:00"] },
      { date: "2026-04-26", timeSlots: ["14:00", "15:00"] }
    ],
  },
  {
    name: "Dr. Ethan Brooks",
    specialization: "Dermatology",
    experience: 8,
    availableSlots: [
      { date: "2026-04-25", timeSlots: ["13:00", "14:00", "16:00"] },
      { date: "2026-04-27", timeSlots: ["10:30", "12:00"] }
    ],
  },
  {
    name: "Dr. Sophia Nguyen",
    specialization: "Neurology",
    experience: 15,
    availableSlots: [
      { date: "2026-04-26", timeSlots: ["09:30", "10:30", "11:30"] },
      { date: "2026-04-28", timeSlots: ["15:00", "16:00"] }
    ],
  },
];

module.exports = async () => {
  const count = await Doctor.countDocuments();
  if (!count) {
    await Doctor.insertMany(doctors);
    console.log("Seeded doctors");
  }
};
