import { Router } from "express";
import deleteUserAccountController from "../../controller/UserAccountController/deleteUserAccount.js";
import getAllUserAccountController from "../../controller/UserAccountController/getAllUserAccount.js";
import updateUserAccountController from "../../controller/UserAccountController/updateUserAccount.js";
import createUserAccountController, { loginUserController } from "../../controller/UserAccountController/cretaeUserAccount.js";

const router = Router();
router.post("/register", createUserAccountController);  // Fixed typo in route path
router.post("/login", loginUserController);
router.delete("/:id", deleteUserAccountController);
router.get("/", getAllUserAccountController);
router.put("/:id", updateUserAccountController);

export default router;