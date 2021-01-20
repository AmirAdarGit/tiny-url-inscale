import { app } from "./app"

const PORT = 8070;
export const server = app.listen(PORT, onListening);

function onListening() {
    console.log(`Listening on ${PORT} - UserService`);

  }
  
  export default server;