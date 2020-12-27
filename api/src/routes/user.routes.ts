import { Router } from "express";
import * as userController from "../controllers/user.controller";

export const router = Router();

router.post("/api/user", userController.create);
router.get("/api/user", userController.read);
router.put("/api/user", userController.update);
router.delete("/api/user", userController.remove);
