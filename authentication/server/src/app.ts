import * as express from "express"
import { router } from './routes'
export const app = express();

app.use(express.json());

app.use('/api/autentication', router);