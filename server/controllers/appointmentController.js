import Appointment from "../models/appointmentModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get appointments with patient details
// @route   GET /api/appointments/with-patients
// @access  Private
const getAppointmentsWithPatients = asyncHandler(async (req, res) => {
  const appointments = await Appointment.getWithPatientDetails();
  res.json(appointments);
});

// @desc    Get appointments with patient and doctor details
// @route   GET /api/appointments/with-doctors
// @access  Private
const getAppointmentsWithDoctors = asyncHandler(async (req, res) => {
  const appointments = await Appointment.getWithPatientAndDoctor();
  res.json(appointments);
});

export {
  getAppointmentsWithPatients,
  getAppointmentsWithDoctors
  // ... other CRUD operations
};