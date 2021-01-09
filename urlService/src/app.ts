import * as express from "express"

import { router as urlEntity} from './routes/urlService.route'

export const app = express();



app.use('/api/url', urlEntity);
