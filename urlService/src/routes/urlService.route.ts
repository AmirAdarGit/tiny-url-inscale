import { Router } from "express";
import * as urlController from "../controllers/urlService.controller"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post

router.post('/api/url', jsonParser, urlController.post);
router.get('/api/url',jsonParser, urlController.get);
router.put('/api/url', urlController.update);
router.delete('/api/url', urlController.remove);