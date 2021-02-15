import { Idatabase } from "../../../interfaces/database/Idatabase"
import  * as mysql  from 'mysql';
import * as util from "util"

export class Database implements Idatabase{
    
    connection: mysql.Connection;
    constructor(host: string, user: string, password:string, database: string){
        this.Connect(host, user, password, database); 

    }

    Connect(host: string, user: string, password: string, database: string): void{
        var db_config = {
            host: host,
            user: user,
            password: password,
            database: database
          };
        this.connection = mysql.createConnection(db_config);           // Recreate the connection, since
        handleDisconnect(this.connection);

        function handleDisconnect(connection: mysql.Connection) {
          console.log("Database module: db-config - ", db_config)
          //this.connection = mysql.createConnection(db_config);           // Recreate the connection, since
                                                                              // the old one cannot be reused.
          connection.connect(function(err: mysql.QueryError) {           // The server is either down
            if(err) {                                                         // or restarting (takes a while sometimes).
              console.log('error when connecting to db:', err);
              setTimeout(handleDisconnect, 2000);                             // We introduce a delay before attempting to reconnect,
            }                                                                 // to avoid a hot loop, and to allow our node script to
          });                                                                 // process asynchronous requests in the meantime.
                                                                              // If you're also serving http, display a 503 error.
          connection.on('error', function(err: mysql.QueryError) {
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {                     // Connection to the MySQL server is usually
              handleDisconnect(connection);                                             // lost due to either server restart, or a
            } else {                                                          // connnection idle timeout (the wait_timeout
              throw err;                                                      // server variable configures this)
            }
          });
        }
    }

    /*
    T = represent the 2 kind of packet which could return from the Execute function
    1. RowDataPacker - SELECT
    2. OkPacket - INSERT
    */
    async Execute<T>(dbQuery: string) : Promise<T>{
      console.log("Database module, Execute method");
        const query = util.promisify(this.connection.query).bind(this.connection);
        try{
          await query(dbQuery, function(err: mysql.QueryError, results: any){
            if(err){
                return err;
            }
                else {
                  console.log("Database module, Execute method - results yype: ",typeof(results));
                  console.log("Database module, Execute method - results: ",results);
                  return results;
                }
            })
        } catch (ex){
          return ex;  
        }
    }
}