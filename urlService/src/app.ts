import * as express from "express"

import { router as urlEntity} from './routes/urlService.route'
import { router as urlShortGenerator} from './routes/urlService.genetator'

export const app = express();



app.use('/api/url', urlEntity);
// app.use('/api/url/shoter', urlShortGenerator);
