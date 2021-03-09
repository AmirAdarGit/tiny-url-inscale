import { Router } from "express";
import { UserController } from "./controller"
import * as bodyParser from 'body-parser'
export const router = Router();
import { Database } from "../../../shared/modules/database/src/database";
import { UserService } from "./service";

var jsonParser = bodyParser.json() //for parsing the data from the http post

const database: Database = new Database(process.env.DB_CONFIGE_HOST, process.env.DB_CONFIGE_USER, process.env.DB_CONFIGE_PASSWORD, process.env.DB_CONFIGE_DATABASE);
database.Connect();

const userService: UserService = new UserService(database);
const userController: UserController = new UserController(userService);

router.post('/', jsonParser, (req, res) => userController.post(req, res));
router.get('/', jsonParser,  (req, res) => userController.get(req, res)); 
