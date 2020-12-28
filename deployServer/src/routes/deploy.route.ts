import { Router } from "express";
import * as deployController from "../controllers/deploy.controller"
export const router = Router();

router.post('/api/deploy', deployController.deploy);