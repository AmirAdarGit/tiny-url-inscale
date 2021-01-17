const express = require('express')
import { app } from "./app"
const PORT = 8090;

app.listen(PORT, onListening);


function onListening() {
    console.log(`Listening on ${PORT}`);

  }