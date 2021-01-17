import { Router } from "express";
import * as urlControllerList from "../controllers/authentication.controllers.new.url"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post

//the middelware is for the authenticate token that comes from the user.
router.post('/', jsonParser, urlControllerList.authenticateToken, urlControllerList.post); 
