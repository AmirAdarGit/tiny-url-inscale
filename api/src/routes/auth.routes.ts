import { Router } from "express";

import { Authenticate } from "../controllers/auth.controller";

import * as bodyParser from 'body-parser'

export const router = Router();
var jsonParser = bodyParser.json() //for parsing the data from the http post

const authenticate: Authenticate = new Authenticate(); 

router.post("/login", jsonParser, authenticate.LogIn);
router.post("/signup", jsonParser, authenticate.SignUp);


