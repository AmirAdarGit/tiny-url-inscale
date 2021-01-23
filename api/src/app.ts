import * as express from "express";

// Routes
import { router as urlRouter } from "./routes/url.routes";
import { router as userRouter } from "./routes/user.routes";
import { router as authentication } from "./routes/auth.routes";


// Create Express server
export const app = express();

// Express configuration

app.use("/api/auth", authentication);
app.use("/api/user", userRouter);
app.use("/api/newLink", urlRouter);

