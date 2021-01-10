import { Router } from "express";
import * as urlController from "../controllers/urlService.controller"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post


router.post('/',jsonParser , urlController.post);
router.get('/shortUrl/:id',jsonParser ,urlController.get); //use for get request:localhost:3000/api/url/ShortURL/[short url number]
router.put('/', urlController.update);
router.delete('/',jsonParser, urlController.remove);