import { Router } from "express";
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import * as bodyParser from 'body-parser'
import { UrlServiceHttpClient } from "../../../shared/modules/urlServiceHttpClient/src/client";
import { AuthServiceHttpClient } from "../../../shared/modules/AuthServiceHttpClient/src/client";
import { AuthController } from "./controller";
import { AuthService } from "./service";

var jsonParser = bodyParser.json() //for parsing the data from the http post
export const router = Router();

const httpClient: HttpClient = new HttpClient()// Post, Get
const authServiceHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient(httpClient); //SignUp, LogIn (from Api) -> authentication
const authService: AuthService = new AuthService(authServiceHttpClient);
const authController: AuthController = new AuthController(authService); //SighUp LogIn


router.post("/signUp", jsonParser, (req, res) => authController.SignUp(req, res));
router.post("/logIn", jsonParser, (req, res) => authController.LogIn(req, res));
router.post("/createUrl", jsonParser, (req, res) => authController.CreateUrl(req, res));// change the logic!