import { Router } from "express";
const router = Router();
import createAppointmentController from "../../controller/AppointmentController/cretaeAppointment.js";
import getAllAppointmentController from "../../controller/AppointmentController/getAllAppointment.js";
import updateAppointmentController from "../../controller/AppointmentController/updeatAppointment.js";
import deleteAppointmentController from "../../controller/AppointmentController/deleteAppointment.js";

// GET route for retrieving all appointments
router.get('/',getAllAppointmentController );
router.post("/", createAppointmentController);
router.delete('/:id', deleteAppointmentController);
router.put('/:id', updateAppointmentController);
export default router;