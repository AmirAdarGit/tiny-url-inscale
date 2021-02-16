import { Router } from "express";
import { UrlController} from "../controllers/url.controller"
import * as bodyParser from 'body-parser'
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase";
import { Database } from "../../../shared/modules/database/src/database";
export const router = Router();

var jsonParser = bodyParser.json() //for parsing the data from the http post

const database: Database = new Database(process.env.DB_CONFIGE_HOST, process.env.DB_CONFIGE_USER, process.env.DB_CONFIGE_PASSWORD, process.env.DB_CONFIGE_DATABASE);
const httpClient: HttpClient = new HttpClient();
const authServiceHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient(httpClient);
const urlController: UrlController = new UrlController(authServiceHttpClient, database);

router.post('/', jsonParser,(req,res) => urlController.Create(req,res));
router.get('/',jsonParser, (req,res) => urlController.Read(req,res));
