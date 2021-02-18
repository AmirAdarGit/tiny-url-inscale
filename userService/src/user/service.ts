import { Request, Response} from "express"   
import { User } from "../../../shared/models/user/index"
import { SignUpProducer } from '../produce.email.sqs/produce';
import { Database } from '../../../shared/modules/database/src/database' 

export class UserService {

    private database: Database;
    private signUpProducer: SignUpProducer;

    constructor(database: Database, signUpProducer: SignUpProducer) {
        this.signUpProducer = signUpProducer;
        this.database = database;
    }

 
    async Create(userEmail: string, userName: string, userPassword: string): Promise<User> {
        const query: string = `INSERT INTO Tiny_URL.Users VALUES ( '${userEmail}', '${userName}', '${userPassword}')`; 
        const user: User = await this.database.Execute<User>(query); 

        await this.signUpProducer.SqSProduceSignUp(userEmail);

        return user;
    }

    async Read(userEmail: string): Promise<User> {
        const query = `SELECT UserPassword FROM Tiny_URL.Users where Email = '${userEmail}'`
        return await this.database.Execute<User>(query) ;
    }

}

   