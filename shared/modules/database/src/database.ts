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
        this.connection = mysql.createConnection(db_config);                 
        handleDisconnect(this.connection);

        function handleDisconnect(connection: mysql.Connection) {
            console.log("Database module: db-config - ", db_config)
            connection.connect(function(err: mysql.QueryError) {             
                if (err) {                                                        
                    console.log('error when connecting to db:', err);
                    setTimeout(handleDisconnect, 2000);                             
                }                                                                  
            });                                              
            connection.on('error', function(err: mysql.QueryError) {
                console.log('db error', err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {                     
                    handleDisconnect(connection);                                             
                } else {                                                          
                    throw err;                                                     
                }
            });
        }
    }

    async Execute<T>(dbQuery: string) : Promise<T>{
        console.log("Database module, Execute method");
            const query = util.promisify(this.connection.query).bind(this.connection);
            try {
                return await query(dbQuery, function(err: mysql.QueryError, results: any){
                    if (err) {
                        return err;
                    } else {
                        console.log("Database module, Execute method - results type: ", typeof(results));
                        console.log("Database module, Execute method - results: ", results);
                        return results;
                    }
                })
            } catch (ex) {
              console.log(`Database-Module: Error: ${ex}`)
              return ex;  
            }
    }
}