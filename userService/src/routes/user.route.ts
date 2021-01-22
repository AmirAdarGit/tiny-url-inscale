import { Router } from "express";
import * as userController from "../controllers/user.controller"
import * as bodyParser from 'body-parser'
export const router = Router();

// var jsonParser = bodyParser.urlencoded({ extended: false });

var jsonParser = bodyParser.json() //for parsing the data from the http post

// jsonParser.json() //for parsing the data from the http post

router.post('/', jsonParser, userController.Create);
router.get('/', jsonParser, userController.Get); // TODO: CamelCasing
router.put('/', jsonParser, userController.update);
router.delete('/', jsonParser, userController.remove);