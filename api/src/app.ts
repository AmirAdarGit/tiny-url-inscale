import * as express from "express";

// Routes
import { router as urlRouter } from "./routes/url.routes";
import { router as userRouter } from "./routes/user.routes";
import { router as logInRouter } from "./routes/url.login.auth";
import { router as signUpRouter } from "./routes/url.signup.auth";


// Create Express server
export const app = express();

// Express configuration
app.use("/api/sighUp", signUpRouter);
app.use("/api/logIn", logInRouter);


app.use("/api/user", userRouter);
app.use("/api/newLink", urlRouter);


