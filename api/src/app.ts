import  * as express  from "express";
import { router as urlRouter } from "./url/routes";
import { router as authentication } from "./auth/routes";
import { api, auth, url } from "../../shared/const"
import * as cors from "cors";
import * as morgan from "morgan"
// Create Express server
export const app = express();

app.use(morgan('combined'))
app.use(cors())
// Express configuration
app.use(`/${api}/${auth}`, authentication);
app.use(`/${api}/${url}`, urlRouter);



