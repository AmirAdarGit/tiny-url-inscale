import { Router } from "express";
import * as urlController from "../controllers/urlService.controller"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post


router.post('/',jsonParser , urlController.post);
router.get('/ShortURL/:id',jsonParser , urlController.get);
router.put('/', urlController.update);
router.delete('/',jsonParser, urlController.remove);