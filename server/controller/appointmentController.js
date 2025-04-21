import Appointment from "../models/appointmentModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Public
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.getAll();
  res.json(appointments);
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Public
const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.getById(req.params.id);

  if (appointment) {
    res.json(appointment);
  } else {
    res.status(404);
    throw new Error("Appointment not found");
  }
});

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.status(201).json(appointment);
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.update(req.params.id, req.body);
  res.json(appointment);
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = asyncHandler(async (req, res) => {
  await Appointment.delete(req.params.id);
  res.json({ message: "Appointment removed" });
});

// @desc    Get appointments with patient details
// @route   GET /api/appointments/with-patients
// @access  Public
const getAppointmentsWithPatients = asyncHandler(async (req, res) => {
  const appointments = await Appointment.getWithPatientDetails();
  res.json(appointments);
});

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsWithPatients
};