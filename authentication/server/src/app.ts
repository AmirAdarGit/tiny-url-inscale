import * as express from "express"
import { router } from './routes'
// import {router as validationTokenRouter } from './routes/auth.routes'
export const app = express();

app.use(express.json());

app.use('/api/autentication', router);

// app.use('/api/autentication/validationToken', validationTokenRouter);



  