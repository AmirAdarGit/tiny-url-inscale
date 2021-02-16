import { app } from "./app"

export const server = app.listen(3456, onListening);

function onListening() {
    console.log(`Listening on ${3456}`);
}
  
export default server;