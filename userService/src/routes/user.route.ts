import { Router } from "express";
import * as urlController from "../controllers/user.controller"
import * as bodyParser from 'body-parser'
export const router = Router();

// var jsonParser = bodyParser.urlencoded({ extended: false });

var jsonParser = bodyParser.json() //for parsing the data from the http post

// jsonParser.json() //for parsing the data from the http post

router.post('/', jsonParser, urlController.Create);
router.get('/', jsonParser, urlController.get); // TODO: CamelCasing
router.put('/', jsonParser, urlController.update);
router.delete('/', jsonParser, urlController.remove);