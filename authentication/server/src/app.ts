import * as express from "express"
import {router as sighUpRouter } from './routes/user.routes'
import {router as logInRouter } from './routes/user.routes'
import {router as validationTokenRouter } from './routes/auth.routes'
export const app = express();

app.use(express.json());

app.use('/api/autentication/signUp', sighUpRouter);
app.use('/api/autentication/logIn', logInRouter);
app.use('/api/autentication/validationToken', validationTokenRouter);



  