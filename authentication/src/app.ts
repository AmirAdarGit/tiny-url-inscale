import * as express from "express"
import {router as sighUpRouter } from './routes/authentication.routes.sign.up'
import {router as logInRouter } from './routes/authentication.routes.log.in'

export const app = express();


app.use(express.json());

app.use('/api/signUp', sighUpRouter);
app.use('/api/logIn', logInRouter);

  