import * as express from "express";

import { app } from "./app"

export const server = app.listen(8080, onListening);

function onListening() {
    console.log(`Listening on ${8080}`);
  }
  
  export default server;