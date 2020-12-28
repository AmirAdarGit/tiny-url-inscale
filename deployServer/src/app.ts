import * as express from "express"
import { router } from './routes/deploy.route'
 
export const app = express();

app.use('/',router)