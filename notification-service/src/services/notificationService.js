const Notification = require("../models/Notification");

const buildMessage = (payload) => {
  if (payload.type === "APPOINTMENT_BOOKED") {
    return `Appointment booked for ${payload.appointmentDate} at ${payload.timeSlot}.`;
  }
  return `Appointment cancelled for ${payload.appointmentDate} at ${payload.timeSlot}.`;
};

const createNotification = async (payload) => {
  const notification = await Notification.create({
    ...payload,
    message: buildMessage(payload),
  });

  console.log(`[Notification:${payload.type}] ${notification.message}`);
  return notification;
};

module.exports = { createNotification };
