import express from "express";
import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsWithPatients
} from "../controllers/appointmentController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
  .get(getAppointments)
  .post(protect, createAppointment);

router.route("/with-patients")
  .get(getAppointmentsWithPatients);

router.route("/:id")
  .get(getAppointmentById)
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

export default router;