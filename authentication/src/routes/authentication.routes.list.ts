import { Router } from "express";
import * as urlControllerList from "../controllers/authentication.controllets.list"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post


router.get('/', jsonParser, urlControllerList.authenticateToken, urlControllerList.get); 
