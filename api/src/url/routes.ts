import { Router } from "express";
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import * as bodyParser from 'body-parser'
import { UrlServiceHttpClient } from "../../../shared/modules/urlServiceHttpClient/src/client";
import { UrlController } from "./controller";
import { UrlService } from "./service";
import { createUrl, id } from "../../../shared/const"
var jsonParser = bodyParser.json() //for parsing the data from the http post
export const router = Router();

const httpClient = new HttpClient()// Post, Get
const urlServiceHttpClient = new UrlServiceHttpClient(httpClient);
const urlService = new UrlService(urlServiceHttpClient);
const urlController = new UrlController(urlService);

router.get(id, jsonParser, urlController.get);
router.post(createUrl, jsonParser, urlController.post);


