import { Router } from "express";
import * as bodyParser from 'body-parser'
import { HttpClient } from "../../../../shared/modules/httpClient/src/HttpClient";
import { ValidetionToken } from "../controllers/auth.controller"
export const router = Router();

var jsonParser = bodyParser.json() //for parsing the data from the http post


router.get('/',jsonParser , ValidetionToken); 
