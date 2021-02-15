import { Router } from "express";
import { UserController } from "../controllers/user.controller"
import * as bodyParser from 'body-parser'
export const router = Router();
import { Database } from "../../../shared/modules/database/src/database";

var jsonParser = bodyParser.json() //for parsing the data from the http post

const database: Database = new Database(process.env.DB_CONFIGE_HOST, process.env.DB_CONFIGE_USER, process.env.DB_CONFIGE_PASSWORD, process.env.DB_CONFIGE_DATABASE);
const userController: UserController = new UserController(database);

router.post('/', jsonParser,(req,res) => userController.Create(req,res));
router.get('/', jsonParser,(req,res) => userController.Read(req,res)); 
// router.put('/', jsonParser, userController.update);
// router.delete('/', jsonParser, userController.remove);