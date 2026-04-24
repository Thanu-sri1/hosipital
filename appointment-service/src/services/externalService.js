const client = require("./httpClient");
const AppError = require("../utils/AppError");

const getPatientById = async (patientId) => {
  try {
    const { data } = await client.get(
      `${process.env.PATIENT_SERVICE_URL}/patients/internal/${patientId}/exists`
    );
    return data.patient;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new AppError("Patient not found", 404);
    }
    throw new AppError("Unable to validate patient", 502);
  }
};

const getDoctorById = async (doctorId) => {
  try {
    const { data } = await client.get(
      `${process.env.DOCTOR_SERVICE_URL}/doctors/internal/${doctorId}`
    );
    return data.doctor;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new AppError("Doctor not found", 404);
    }
    throw new AppError("Unable to fetch doctor details", 502);
  }
};

const validateDoctorSlot = async (doctorId, date, timeSlot) => {
  try {
    const { data } = await client.post(
      `${process.env.DOCTOR_SERVICE_URL}/doctors/internal/${doctorId}/validate-slot`,
      { date, timeSlot }
    );
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new AppError("Doctor not found", 404);
    }
    throw new AppError("Unable to validate doctor availability", 502);
  }
};

const sendNotification = async (payload) => {
  try {
    await client.post(`${process.env.NOTIFICATION_SERVICE_URL}/notifications/send`, payload);
  } catch (error) {
    console.error("Notification dispatch failed", error.message);
  }
};

module.exports = {
  getPatientById,
  getDoctorById,
  validateDoctorSlot,
  sendNotification,
};
