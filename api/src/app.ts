import * as express from "express";
import { router as urlRouter } from "./url/routes";
import { router as authentication } from "./auth/routes";

// Create Express server
export const app = express();

// Express configuration
app.use("/api/auth", authentication);
app.use("/api/url", urlRouter);


