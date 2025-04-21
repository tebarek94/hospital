import express from "express";
import { getAppointmentsWithDoctors, getAppointmentsWithPatients } from "../controllers/appointmentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
  .get( getAppointmentsWithPatients);
  router.get('/', getAppointmentsWithDoctors);

export default router;