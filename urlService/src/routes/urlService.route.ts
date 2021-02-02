import { Router } from "express";
import { UrlController} from "../controllers/url.controller"
import * as bodyParser from 'body-parser'
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
export const router = Router();



var jsonParser = bodyParser.json() //for parsing the data from the http post

const httpClient: HttpClient = new HttpClient();
const authServiceHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient(httpClient);
const urlController: UrlController = new UrlController(authServiceHttpClient);

router.post('/', jsonParser,(req,res) => urlController.Post(req,res));
router.get('/',jsonParser, (req,res) => urlController.Get(req,res));
router.put('/',jsonParser, urlController.Update);
router.delete('/',jsonParser, urlController.Remove);