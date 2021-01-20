import * as express from "express"
import { router } from './routes/user.route'

export const app = express();

app.use('/api/user', router)