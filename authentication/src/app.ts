import * as express from "express"
import {router as sighUpRouter } from './routes/authentication.routes.sign.up'
import {router as logInRouter } from './routes/authentication.routes.log.in'
import {router as urlList } from './routes/authentication.routes.list'
import {router as newUrl } from './routes/authentication.routes.new.url'


export const app = express();


app.use(express.json());

app.use('/api/signUp', sighUpRouter);
app.use('/api/logIn', logInRouter);
app.use('/api/list', urlList);
app.use('/api/newLink', newUrl);


  