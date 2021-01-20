import { Router } from "express";
import * as signUpController from "../controllers/authentication.controllers.sighUp"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post


router.post('/',jsonParser , signUpController.SignUp);
// router.get('/',jsonParser ,sighUp.get); 
