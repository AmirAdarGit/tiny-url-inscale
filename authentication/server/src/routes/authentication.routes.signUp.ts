import { Router } from "express";
import * as signUpController from "../controllers/user.controller"
import * as logInController from "../controllers/user.controller"
import { UserServiceHttpClient } from "../../../../shared/modules/userServiceHttpClient/client"
import * as bodyParser from 'body-parser'
import { HttpClient } from "../../../../shared/modules/httpClient/src/HttpClient";
import { UserController } from "../controllers/user.controller";
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post

const httpClient = new HttpClient()// Post, Get 
const userServiceHttpClient = new UserServiceHttpClient(httpClient); //SignUp, LogIn
const userController = new UserController(userServiceHttpClient);

router.post('/',jsonParser , (req, res) => userController.SignUp(req, res));
router.get('/',jsonParser ,(req, res) => userController.LogIn(req, res)); 
