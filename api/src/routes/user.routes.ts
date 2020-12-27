import { Router } from "express";
import * as userController from "../controllers/user.controller";

export const router = Router();

router.post("/", userController.create);
router.get("/", userController.read);
router.put("/", userController.update);
router.delete("/", userController.remove);
