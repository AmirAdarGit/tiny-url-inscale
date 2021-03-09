import * as express from "express"
import { router } from './user/routes'
import { api, user } from "../../shared/const"
export const app = express();

app.use(`/${api}/${user}`, router)