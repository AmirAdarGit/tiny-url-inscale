const express = require('express')
import { app } from "./app"
const PORT = 8080;

app.listen(PORT, onListening);

function onListening() {
    console.log(`Listening on ${PORT} - Authenticate`);
}