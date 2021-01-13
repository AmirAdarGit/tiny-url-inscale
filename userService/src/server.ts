import { app } from "./app"

const PORT = 8090;
export const server = app.listen(PORT, onListening);

function onListening() {
    console.log(`Listening on ${PORT}`);

  }
  
  export default server;