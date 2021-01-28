import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import * as bodyParser from 'body-parser'
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client";
import { UrlServiceHttpClient } from "../../../shared/modules/urlServiceHttpClient/client";

export const router = Router();
var jsonParser = bodyParser.json() //for parsing the data from the http post

const httpClient: HttpClient = new HttpClient()// Post, Get
const authServiceHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient(httpClient); //SignUp, LogIn (from Api) -> authentication
const urlServiceHttpClient: UrlServiceHttpClient = new UrlServiceHttpClient(httpClient);
const authenticate: AuthController = new AuthController(authServiceHttpClient, urlServiceHttpClient); //SighUp LogIn


router.post("/signUp", jsonParser, (req, res) => authenticate.SignUp(req, res));
router.post("/logIn", jsonParser, (req, res) => authenticate.LogIn(req, res));
router.post("/createUrl", jsonParser, (req, res) => authenticate.CreateUrl(req, res));

