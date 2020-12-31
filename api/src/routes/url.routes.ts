import { Router } from "express";

import * as urlController from "../controllers/url.controller";

export const router = Router();

router.get("/", urlController.get);
router.post("/", urlController.post);
router.put("/", urlController.update);
router.delete("/", urlController.remove);
