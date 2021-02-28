import { Router } from "express";
import { UrlController} from "./controller"
import * as bodyParser from 'body-parser'
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
import { Database } from "../../../shared/modules/database/src/database";
import { UrlService } from "./service"
import { UrlProducer } from "../produce.url.sqs/produce";
export const router = Router();

var jsonParser = bodyParser.json() //for parsing the data from the http post

const database: Database = new Database(process.env.DB_CONFIGE_HOST, process.env.DB_CONFIGE_USER, process.env.DB_CONFIGE_PASSWORD, process.env.DB_CONFIGE_DATABASE);
const httpClient: HttpClient = new HttpClient();
const authServiceHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient(httpClient);
const urlProducer: UrlProducer = new UrlProducer(process.env.AWS_QUEUE_REGION, process.env.AWS_QUEUE_URL); //inject the region
const urlService: UrlService = new UrlService (database, authServiceHttpClient, urlProducer);
const urlController: UrlController = new UrlController(urlService);

router.post('/', jsonParser, urlController.post);
router.get('/',jsonParser, urlController.get);