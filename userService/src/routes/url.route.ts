import { Router } from "express";
import * as urlController from "../controllers/user.controller"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post

router.post('/api/user', jsonParser, urlController.post);
router.get('/api/user', urlController.get);
router.put('/api/user', urlController.update);
router.delete('/api/user', urlController.remove);