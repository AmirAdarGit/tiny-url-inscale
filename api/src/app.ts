import * as express from "express";

// Routes
import { index } from "./routes/index";
// Create Express server
export const app = express();

// Express configuration
app.use("/", index);