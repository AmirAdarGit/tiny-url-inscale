import * as express from "express"
import { router } from './routes/url.route'

export const app = express();

app.use('/',router)