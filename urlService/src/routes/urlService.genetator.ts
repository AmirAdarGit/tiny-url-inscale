
import { Router } from "express";
import * as urlControllerGeneratror from "../controllers/urlService.controller.generator"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post

router.get('/',jsonParser, urlControllerGeneratror.generateShortUrl);