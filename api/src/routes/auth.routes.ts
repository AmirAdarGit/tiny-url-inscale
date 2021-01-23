import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";

import * as bodyParser from 'body-parser'
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client";

export const router = Router();
var jsonParser = bodyParser.json() //for parsing the data from the http post

const httpClient = new HttpClient()
const authServiceHttpClient = new AuthServiceHttpClient(httpClient);
const authenticate: AuthController = new AuthController(authServiceHttpClient); 


router.post("/login", jsonParser, authenticate.LogIn);
router.post("/signup", jsonParser, (req, res) => authenticate.SignUp(req, res));
