import { Router } from "express";
// import createEmergencyContactController from "../../controller/EmergencyContactController/createEmergencyContact.js";
import deleteEmergencyContactController from "../../controller/EmergencyContactController/deleteEmergencyContac.jst";
import getEmergencyContactController from "../../controller/EmergencyContactController/getEmergencyContact.js";
import updateEmergencyContactController from "../../controller/EmergencyContactController/updateEmergencyContact.js";
const router =Router();
//  router.post("/",createEmergencyContactController)
 router.get("/",getEmergencyContactController)
 router.delete("/:id",deleteEmergencyContactController)
 router.put("/:id",updateEmergencyContactController)

export default router;