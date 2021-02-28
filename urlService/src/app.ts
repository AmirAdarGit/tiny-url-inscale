import * as express from "express"

import { router as urlRouter} from './url/routes'
import { api, url } from "../../shared/const"
export const app = express();

app.use(`${api}${url}`, urlRouter);