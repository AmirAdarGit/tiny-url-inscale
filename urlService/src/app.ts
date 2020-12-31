import * as express from "express"
import { router } from './routes/urlService.route'

export const app = express();

app.use('/',router)