import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import * as bodyParser from 'body-parser'
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client";

export const router = Router();
var jsonParser = bodyParser.json() //for parsing the data from the http post

const httpClient = new HttpClient()// Post, Get
const authServiceHttpClient = new AuthServiceHttpClient(httpClient); //SignUp, LogIn (from Api) -> authentication
const authenticate: AuthController = new AuthController(authServiceHttpClient); //SighUp LogIn


router.post("/signUp", jsonParser, (req, res) => authenticate.SignUp(req, res));
router.post("/logIn", jsonParser, (req, res) => authenticate.LogIn(req, res));
