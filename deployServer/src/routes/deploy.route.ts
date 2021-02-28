import { Router } from "express";
import * as deployController from "../controllers/deploy.controller"
export const router = Router();
import { api, deploy } from "../../../shared/const";

router.post(`${api}${deploy}`, deployController.deploy);