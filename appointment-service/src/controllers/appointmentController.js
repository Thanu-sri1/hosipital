const catchAsync = require("../utils/catchAsync");
const {
  bookAppointment,
  cancelAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
} = require("../services/appointmentService");

const book = catchAsync(async (req, res) => {
  const appointment = await bookAppointment({
    patientId: req.user.id,
    doctorId: req.body.doctorId,
    appointmentDate: req.body.appointmentDate,
    timeSlot: req.body.timeSlot,
  });

  res.status(201).json({
    message: "Appointment booked successfully",
    appointment,
  });
});

const cancel = catchAsync(async (req, res) => {
  const appointment = await cancelAppointment(req.params.id, req.user.id);
  res.json({
    message: "Appointment cancelled successfully",
    appointment,
  });
});

const mine = catchAsync(async (req, res) => {
  const appointments = await getAppointmentsByPatient(req.user.id);
  res.json({ appointments });
});

const doctorAppointments = catchAsync(async (req, res) => {
  const appointments = await getAppointmentsByDoctor(req.params.doctorId);
  res.json({ appointments });
});

module.exports = {
  book,
  cancel,
  mine,
  doctorAppointments,
};
