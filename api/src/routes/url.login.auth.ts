import { Router } from "express";

import * as loginAuth from "../controllers/auth.login.controller";
import * as bodyParser from 'body-parser'
var jsonParser = bodyParser.json() //for parsing the data from the http post

export const router = Router();

router.post("/", jsonParser, loginAuth.post);
// router.get("/", loginAuth.get);
// router.put("/", loginAuth.update);
// router.delete("/", loginAuth.remove);
