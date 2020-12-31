import * as express from "express";

// Routes
import { router as urlRouter } from "./routes/url.routes";
import { router as userRouter } from "./routes/user.routes";
// Create Express server
export const app = express();

// Express configuration
app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);


