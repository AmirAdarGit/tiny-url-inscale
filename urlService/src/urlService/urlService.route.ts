import { Router } from "express";
import { UrlController} from "./url.controller"
import * as bodyParser from 'body-parser'
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase";
import { Database } from "../../../shared/modules/database/src/database";
import { UrlService } from "./service"
export const router = Router();

var jsonParser = bodyParser.json() //for parsing the data from the http post

const database: Database = new Database(process.env.DB_CONFIGE_HOST, process.env.DB_CONFIGE_USER, process.env.DB_CONFIGE_PASSWORD, process.env.DB_CONFIGE_DATABASE);
const httpClient: HttpClient = new HttpClient();
const authServiceHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient(httpClient);
const urlService: UrlService = new UrlService (database, authServiceHttpClient);
const urlController: UrlController = new UrlController(urlService);

router.post('/', jsonParser,(req,res) => urlController.Post(req,res));
router.get('/',jsonParser, (req,res) => urlController.Get(req,res));
