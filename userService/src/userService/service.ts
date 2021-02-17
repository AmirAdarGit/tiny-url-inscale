import { Request, Response} from "express"   
import { parseInsertQueryToString, parseGetQueryToString } from "../databaseUserQuery/queries"
import { User } from "../../../shared/models/user/index"
import { SignUpProducer } from '../produce.email.sqs/produce';
import { Database } from '../../../shared/modules/database/src/database' 
import * as mysql from 'mysql'

export class UserService {

    database: Database;
    signUpProducer: SignUpProducer;

    constructor(database: Database, signUpProducer: SignUpProducer) {
        this.signUpProducer = signUpProducer;
        this.database = database;
    }

 
    async Execute<T>(query: string) {
            return await this.database.Execute<mysql.OkPacket>(query);//send the query to mysql db 
    }

    async SqSProduceSignUp(userEmail: string){    
            return await this.signUpProducer.SqSProduceSignUp(userEmail);
    }
}

   