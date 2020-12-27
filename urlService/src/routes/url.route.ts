import { Router } from "express";
import * as urlController from "../controllers/url.controller"
export const router = Router();

router.get('/api/url', urlController.read);
router.post('/api/url', urlController.create);
router.put('/api/url', urlController.update);
router.delete('/api/url', urlController.remove);