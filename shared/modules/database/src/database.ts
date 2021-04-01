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

    Connect(): void {
        var db_config = {
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        };

        this.connection = mysql.createConnection(db_config);
        
        setTimeout(() => {
            this.connection.connect(function(err: mysql.QueryError) {             
                if (err) {                                                        
                    console.log('error when connecting to db:', err);
                } else {
                    console.log('connected to db :)');
                }                                                                
            });  
        }, 2000)
    }

    async Execute<T>(dbQuery: string) : Promise<T>{
        console.log("Database module, Execute method");
        try {
            const query = util.promisify(this.connection.query).bind(this.connection);
            const ans = await query(dbQuery);
            return ans;
        } catch (err) {
            console.log(err);
        }
    }
}