import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient";
import * as bodyParser from 'body-parser'
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client";
import { UrlServiceHttpClient } from "../../../shared/modules/urlServiceHttpClient/client";
import { UrlController } from "../controllers/url.controller";
var jsonParser = bodyParser.json() //for parsing the data from the http post

export const router = Router();

const httpClient = new HttpClient()// Post, Get
const urlServiceHttpClient = new UrlServiceHttpClient(httpClient);
const urlController: UrlController = new UrlController(urlServiceHttpClient);


router.get("/:id", jsonParser ,(req,res) => urlController.Get(req, res));
// router.post("/",jsonParser, urlController.Post);
// router.put("/", urlController.Update);
// router.delete("/", urlController.Remove);
