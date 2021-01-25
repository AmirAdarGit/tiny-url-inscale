import * as express from "express"
import {router as sighUpRouter } from './routes/authentication.routes.signUp'
import {router as logInRouter } from './routes/authentication.routes.signUp'


export const app = express();


app.use(express.json());

app.use('/api/autentication/signUp', sighUpRouter);
app.use('/api/autentication/logIn', logInRouter);



  