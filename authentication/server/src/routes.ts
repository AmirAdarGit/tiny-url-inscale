import { Router } from "express";
import { UserServiceHttpClient } from "../../../shared/modules/userServiceHttpClient/src/client"
import * as bodyParser from 'body-parser'
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import { AuthController } from "./controller";
import { AuthService } from "./service";
export const router = Router();
import { signUp, logIn, authenticateToken } from "../../../shared/const";

var jsonParser = bodyParser.json() //for parsing the data from the http post

const httpClient = new HttpClient()// Post, Get 
const userServiceHttpClient = new UserServiceHttpClient(httpClient); //SignUp, LogIn
const authService: AuthService = new AuthService(userServiceHttpClient)
const authController = new AuthController(authService);

router.post(signUp, jsonParser, authController.signUp);
router.get(logIn, jsonParser, authController.logIn); 
router.get(authenticateToken, jsonParser, authController.authenticateToken); 