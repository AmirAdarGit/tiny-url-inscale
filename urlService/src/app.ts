import * as express from "express"

import { router as urlEntity} from './routes/urlService.route'
import { router as allUrls} from './routes/urlService.all.urls.route'

export const app = express();



app.use('/api/url', urlEntity);
app.use('/api/url/list', allUrls);
