import * as express from "express"
import { router } from './routes'
import { api, authentication } from "../../../shared/const"

export const app = express();


app.use(express.json());

app.use(`${api}/${authentication}`, router);