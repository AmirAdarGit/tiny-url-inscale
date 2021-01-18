import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as bodyParser from 'body-parser'
var jsonParser = bodyParser.json() //for parsing the data from the http post

export const router = Router();

router.post("/",jsonParser, userController.post);
router.get("/", userController.get);
router.put("/", userController.update);
router.delete("/", userController.remove);
