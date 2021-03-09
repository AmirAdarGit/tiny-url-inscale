import { Router } from "express";
import { UserServiceHttpClient } from "../../shared/modules/userServiceHttpClient/src/client"
import * as bodyParser from 'body-parser'
import { HttpClient } from "../../shared/modules/httpClient/src/HttpClient";
import { AuthController } from "./controller";
import { AuthService } from "./service";
import { signUp, logIn, authenticateToken } from "../../shared/const";
import { SignUpProducer } from "../produce.email.sqs/produce";

export const router = Router();

var jsonParser = bodyParser.json() //for parsing the data from the http post

const httpClient = new HttpClient()// Post, Get 
const userServiceHttpClient = new UserServiceHttpClient(httpClient); //SignUp, LogIn
const signUpProducer: SignUpProducer = new SignUpProducer();
const authService: AuthService = new AuthService(userServiceHttpClient, signUpProducer)
const authController = new AuthController(authService);

router.post(`/${signUp}`, jsonParser, (req, res) => authController.signUp(req, res));
router.get(`/${logIn}`, jsonParser, (req, res) => authController.logIn(req, res)); 
router.get(`/${authenticateToken}`, jsonParser, (req, res) => authController.authenticateToken(req, res)); 