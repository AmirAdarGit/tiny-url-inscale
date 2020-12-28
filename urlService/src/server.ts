import * as express from "express";
import { app } from "./app";
import  * as conector  from "./database/conector";



export const server = app.listen(8080, onListening);

function onListening() {
    console.log(`Listening on ${8080}`);
    // conector.connection;
    // conector.connectorLogs;     
  }
  
  export default server;