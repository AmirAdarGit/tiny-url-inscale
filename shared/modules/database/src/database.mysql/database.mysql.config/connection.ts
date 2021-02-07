import * as mysql from 'mysql';
import {createConnection, QueryError, RowDataPacket} from 'mysql';

//await?

var db_config = {
  host: 'aws-tinyurl.cppbeuypt4xk.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'amirA123',
  database: 'Tiny_URL'
};

export var connection: any; //what type?

function handleDisconnect() {
  connection = mysql.createConnection(db_config);           // Recreate the connection, since
                                                            // the old one cannot be reused.

  connection.connect(function(err: QueryError) {                   // The server is either down
    if(err) {                                               // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);                   // We introduce a delay before attempting to reconnect,
    }                                                       // to avoid a hot loop, and to allow our node script to
  });                                                       // process asynchronous requests in the meantime.
                                                            // If you're also serving http, display a 503 error.
  connection.on('error', function(err: QueryError) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {           // Connection to the MySQL server is usually
      handleDisconnect();                                   // lost due to either server restart, or a
    } else {                                                // connnection idle timeout (the wait_timeout
      throw err;                                            // server variable configures this)
    }
  });
}

handleDisconnect();