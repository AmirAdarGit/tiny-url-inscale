import { Router } from "express";
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import * as bodyParser from 'body-parser'
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client";
import { AuthController } from "./controller";
import { AuthService } from "./service";
import { signUp, logIn } from "../../../shared/const";

var jsonParser = bodyParser.json() 
export const router = Router();

const httpClient: HttpClient = new HttpClient()
const authServiceHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient(httpClient);
const authService: AuthService = new AuthService(authServiceHttpClient);
const authController: AuthController = new AuthController(authService); 


router.post(`/${signUp}`, jsonParser,(req, res) => authController.signUp(req, res));
router.post(`/${logIn}`, jsonParser,(req, res) => authController.logIn(req, res));
