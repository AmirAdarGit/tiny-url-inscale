import { Router } from "express";

import * as authenticate from "../controllers/authentications/authenticate";

import * as bodyParser from 'body-parser'

export const router = Router();
var jsonParser = bodyParser.json() //for parsing the data from the http post

// router.post("/login", jsonParser, authenticate.LogIn);
router.post("/signup", jsonParser, authenticate.SignUp);


