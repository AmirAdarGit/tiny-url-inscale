import { Idatabase } from "../../../interfaces/database/Idatabase"
import * as mysql  from 'mysql';
import * as util from "util";

export class Database implements Idatabase{
    
    connection: mysql.Connection;
    host: string;
    user: string;
    password: string;
    database: string;

    constructor(host: string, user: string, password:string, database: string){
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }

    Connect(): void{
        var db_config = {
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
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
        
        return await query(dbQuery);
    }
}