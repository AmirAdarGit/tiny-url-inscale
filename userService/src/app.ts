import * as express from "express"
import { router } from './user/routes'

export const app = express();

app.use('/api/user', router)