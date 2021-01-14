import { Router } from "express";
import * as urlList from "../controllers/urlService.all.urls.controller"
import * as bodyParser from 'body-parser'
export const router = Router();


var jsonParser = bodyParser.json() //for parsing the data from the http post


router.get('/',jsonParser ,urlList.get); //use for get request:localhost:3000/api/url/ShortURL/[short url number]
