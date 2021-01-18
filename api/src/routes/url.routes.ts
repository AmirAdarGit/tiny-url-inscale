import { Router } from "express";

import * as urlController from "../controllers/url.controller";
import * as bodyParser from 'body-parser'
var jsonParser = bodyParser.json() //for parsing the data from the http post

export const router = Router();

router.post("/",jsonParser, urlController.post);
router.get("/", urlController.get);
router.put("/", urlController.update);
router.delete("/", urlController.remove);
