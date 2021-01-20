import { app } from "./app";

const PORT = '8080';
const server = app.listen(PORT, onListening);

function onListening() {
  console.log(`Listening on ${PORT} - Api`);
}

export default server;
