import { Router } from "express";

import * as urlController from "../controllers/url.controller";

export const router = Router();

router.get("/", urlController.read);
router.post("/", urlController.create);
router.put("/", urlController.update);
router.delete("/", urlController.remove);
