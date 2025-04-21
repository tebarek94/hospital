import { Router } from "express";
import createBedInformationController from "../../controller/BedInformationController/createBedInformation";
import getBedInformationController from "../../controller/BedInformationController/getBedInformation";
import updateBedInformationController from "../../controller/BedInformationController/updateBedInformation";
import deleteBedInformationController from "../../controller/BedInformationController/deleteBedInformation";
const router=Router();
router.post("/",createBedInformationController);
router.get("/",getBedInformationController);
router.put('/:id',updateBedInformationController);
router.delete("/:id",deleteBedInformationController);

export default router;