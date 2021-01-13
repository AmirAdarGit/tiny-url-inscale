import { Router } from "express";
import * as sighUp from "../controllers/authentication.controllers.sigh.up"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post


router.post('/',jsonParser , sighUp.post);
router.get('/',jsonParser ,sighUp.get); 
