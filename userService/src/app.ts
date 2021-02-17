import * as express from "express"
import { router } from './userService/userService.route'

export const app = express();

app.use('/api/user', router)