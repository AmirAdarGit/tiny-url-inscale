import { Router } from "express";
import * as userController from "../controllers/user.controller";

export const router = Router();

router.post("/", userController.post);
router.get("/", userController.get);
router.put("/", userController.update);
router.delete("/", userController.remove);
