import Patient from "../models/patientModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get patient full profile
// @route   GET /api/patients/:id/full
// @access  Private
const getPatientFullProfile = asyncHandler(async (req, res) => {
  const patient = await Patient.getFullProfile(req.params.id);
  
  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }
});

// @desc    Get patient with emergency contacts
// @route   GET /api/patients/:id/emergency-contacts
// @access  Private
const getPatientWithEmergencyContacts = asyncHandler(async (req, res) => {
  const patient = await Patient.getWithEmergencyContacts(req.params.id);
  res.json(patient);
});

// @desc    Get patient with insurance
// @route   GET /api/patients/:id/insurance
// @access  Private
const getPatientWithInsurance = asyncHandler(async (req, res) => {
  const patient = await Patient.getWithInsurance(req.params.id);
  res.json(patient);
});

export {
  getPatientFullProfile,
  getPatientWithEmergencyContacts,
  getPatientWithInsurance
  // ... other CRUD operations
};