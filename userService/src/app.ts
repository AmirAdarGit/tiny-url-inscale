import * as express from "express"
import { router } from './routes/userService.route'

export const app = express();

app.use('/api/user', router)