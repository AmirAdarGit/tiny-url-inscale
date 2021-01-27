import { app } from "./app"

const PORT = 8080;
export const server = app.listen(PORT, onListening);

function onListening() {
    console.log(`Listening on ${PORT} - UrlService`);

  }
  
  export default server;