import * as express from "express";

// Routes
import { router } from "./routes/url.routes";
// Create Express server
export const app = express();

// Express configuration
app.use("/", router);
