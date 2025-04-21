import { Router } from "express";
import { getAllPatientController } from "../../controller/pateintController/getAllPatientController.js";
import deletePatientController from "../../controller/pateintController/DeletePatientesController.js";
import { createPatientes } from "../../controller/pateintController/InsertPatientesController.js";
import updatePatientController from "../../controller/pateintController/UpdatePatientesController.js";

const router = Router();

// GET route for retrieving all patients
router.get('/', getAllPatientController);
router.post("/",createPatientes)
router.delete('/:id', deletePatientController);
router.put('/:id',updatePatientController );

export default router;
