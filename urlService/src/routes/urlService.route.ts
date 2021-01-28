import { Router } from "express";
import * as urlController from "../controllers/url.controller"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post


router.post('/',jsonParser , urlController.post);
router.get('/',jsonParser , urlController.get); //use for get request:localhost:8080/api/url/[short url number]
// router.get('/',jsonParser ,(req, res) => urlController.get(req, res)); //use for get request:localhost:8080/api/url/[short url number]

router.put('/', urlController.update);
router.delete('/',jsonParser, urlController.remove);