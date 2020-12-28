import * as express from "express";
import { app } from "./app";
import  * as conector  from "./database/conector";



export const server = app.listen(8080, onListening);

function onListening() {
    conector.connection;
    conector.connectorLogs; 
    console.log(`Listening on ${8080}`);
    
  }
  
  export default server;