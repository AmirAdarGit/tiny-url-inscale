import { Router } from "express";

import * as sighUpAuth from "../controllers/auth.signup.controller";
import * as bodyParser from 'body-parser'

export const router = Router();
var jsonParser = bodyParser.json() //for parsing the data from the http post

router.post("/", jsonParser, sighUpAuth.post);

