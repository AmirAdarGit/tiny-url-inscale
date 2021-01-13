import { Router } from "express";
import * as logIn from "../controllers/authentication.controllers.log.in"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post


router.post('/',jsonParser , logIn.post);
router.get('/',jsonParser , logIn.get); 
