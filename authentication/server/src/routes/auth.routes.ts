import { Router } from "express";
import * as bodyParser from 'body-parser'
import { HttpClient } from "../../../../shared/modules/httpClient/src/HttpClient";
import  * as ValidetionToken  from "../controllers/auth.controller"
export const router = Router();

var jsonParser = bodyParser.json() //for parsing the data from the http post


router.get('/user', jsonParser, (req, res) => ValidetionToken.UserValidetionToken(req, res)); 
router.get('/link', jsonParser, (req, res) => ValidetionToken.LinkValidetionToken(req, res)); 
