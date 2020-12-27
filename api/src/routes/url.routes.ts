import { Router } from "express";
import * as urlController from "../controllers/user.controller";

export const router = Router();

router.post("/api/url", urlController.create);
router.get("/api/url", urlController.read);
router.put("/api/url", urlController.update);
router.delete("/api/url", urlController.remove);
