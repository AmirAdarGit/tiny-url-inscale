import { Router } from "express";
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import * as bodyParser from 'body-parser'
import { AuthServiceHttpClient } from "../../../shared/modules/AuthServiceHttpClient/src/client";
import { AuthController } from "./controller";
import { AuthService } from "./service";
import { signUp, logIn } from "../../../shared/const";

var jsonParser = bodyParser.json() //for parsing the data from the http post
export const router = Router();

const httpClient: HttpClient = new HttpClient()// Post, Get
const authServiceHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient(httpClient); //SignUp, LogIn (from Api) -> authentication
const authService: AuthService = new AuthService(authServiceHttpClient);
const authController: AuthController = new AuthController(authService); //SighUp LogIn


router.post(`/${signUp}`, jsonParser, authController.signUp);
router.post(`/${logIn}`, jsonParser, authController.logIn);
