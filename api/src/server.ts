import { app } from "./app";

const server = app.listen(8080, onListening);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}a`);
}

export default server;
