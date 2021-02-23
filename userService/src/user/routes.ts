import { Router } from "express";
import { UserController } from "./controller"
import * as bodyParser from 'body-parser'
export const router = Router();
import { Database } from "../../../shared/modules/database/src/database";
import { UserService } from "./service";
import { SignUpProducer } from '../produce.email.sqs/produce';

var jsonParser = bodyParser.json() //for parsing the data from the http post

const database: Database = new Database(process.env.DB_CONFIGE_HOST, process.env.DB_CONFIGE_USER, process.env.DB_CONFIGE_PASSWORD, process.env.DB_CONFIGE_DATABASE);
const signUpProducer: SignUpProducer = new SignUpProducer();
const userService: UserService = new UserService(database, signUpProducer);
const userController: UserController = new UserController(userService);

router.post('/', jsonParser, userController.post);
router.get('/', jsonParser, userController.get); 
