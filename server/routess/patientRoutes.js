import express from "express";
import {
  getPatientFullProfile,
  getPatientWithEmergencyContacts,
  getPatientWithInsurance
} from "../controllers/patientController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.route("/:id")
  .get(protect, getPatientFullProfile);

router.route("/:id/emergency-contacts")
  .get(protect, getPatientWithEmergencyContacts);

router.route("/:id/insurance")
  .get(protect, getPatientWithInsurance);

export default router;