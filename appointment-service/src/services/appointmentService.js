const Appointment = require("../models/Appointment");
const AppError = require("../utils/AppError");
const {
  getPatientById,
  getDoctorById,
  validateDoctorSlot,
  sendNotification,
} = require("./externalService");

const enrichAppointment = async (appointment) => {
  const [patient, doctor] = await Promise.all([
    getPatientById(appointment.patientId),
    getDoctorById(appointment.doctorId),
  ]);

  return {
    id: appointment._id,
    patientId: appointment.patientId,
    doctorId: appointment.doctorId,
    appointmentDate: appointment.appointmentDate,
    timeSlot: appointment.timeSlot,
    status: appointment.status,
    createdAt: appointment.createdAt,
    patient,
    doctor,
  };
};

const bookAppointment = async ({ patientId, doctorId, appointmentDate, timeSlot }) => {
  await getPatientById(patientId);
  const { doctor, isAvailable } = await validateDoctorSlot(
    doctorId,
    appointmentDate,
    timeSlot
  );

  if (!isAvailable) {
    throw new AppError("Doctor is not available for the selected slot", 400);
  }

  const existingPatientAppointment = await Appointment.findOne({
    patientId,
    appointmentDate,
    timeSlot,
    status: "BOOKED",
  });

  if (existingPatientAppointment) {
    throw new AppError("Patient already has an appointment in this time slot", 409);
  }

  const existingDoctorAppointment = await Appointment.findOne({
    doctorId,
    appointmentDate,
    timeSlot,
    status: "BOOKED",
  });

  if (existingDoctorAppointment) {
    throw new AppError("This doctor slot has already been booked", 409);
  }

  const appointment = await Appointment.create({
    patientId,
    doctorId,
    appointmentDate,
    timeSlot,
    status: "BOOKED",
  });

  await sendNotification({
    type: "APPOINTMENT_BOOKED",
    appointmentId: appointment._id,
    patientId,
    doctorId,
    appointmentDate,
    timeSlot,
    doctorName: doctor.name,
  });

  return enrichAppointment(appointment);
};

const cancelAppointment = async (appointmentId, patientId) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }
  if (appointment.patientId !== patientId) {
    throw new AppError("You are not allowed to cancel this appointment", 403);
  }
  if (appointment.status === "CANCELLED") {
    throw new AppError("Appointment is already cancelled", 400);
  }

  appointment.status = "CANCELLED";
  await appointment.save();

  await sendNotification({
    type: "APPOINTMENT_CANCELLED",
    appointmentId: appointment._id,
    patientId: appointment.patientId,
    doctorId: appointment.doctorId,
    appointmentDate: appointment.appointmentDate,
    timeSlot: appointment.timeSlot,
  });

  return enrichAppointment(appointment);
};

const getAppointmentsByPatient = async (patientId) => {
  const appointments = await Appointment.find({ patientId }).sort({
    appointmentDate: 1,
    timeSlot: 1,
  });
  return Promise.all(appointments.map(enrichAppointment));
};

const getAppointmentsByDoctor = async (doctorId) => {
  const appointments = await Appointment.find({ doctorId }).sort({
    appointmentDate: 1,
    timeSlot: 1,
  });
  return Promise.all(appointments.map(enrichAppointment));
};

module.exports = {
  bookAppointment,
  cancelAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
};
