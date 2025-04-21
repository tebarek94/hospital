import { Router } from "express";
import createDepartmentController from "../../controller/DepartmentController/cretaeDepartment";
import getDepartmentController from "../../controller/DepartmentController/getDepartment";
import updateDepartmentController from "../../controller/DepartmentController/updateDepartment";
import deleteDepartmentController from "../../controller/DepartmentController/deleteDepartment";
const router=Router();
router.post("/",createDepartmentController);
router.get("/",getDepartmentController);
router.put("/:id",updateDepartmentController);
router.delete("/:id",deleteDepartmentController);

export default router;