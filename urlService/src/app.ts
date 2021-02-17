import * as express from "express"

import { router as urlRouter} from './urlService/routes'

export const app = express();

app.use('/api/url', urlRouter);
