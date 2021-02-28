import { Request, Response} from "express"   
import { User } from "../../../shared/models/user/index"
import { SignUpProducer } from '../../../authentication/server/produce.email.sqs/produce';
import { Idatabase } from "../../../shared/interfaces/database/Idatabase"

export class UserService {

    private database: Idatabase;

    constructor(database: Idatabase) {
        this.database = database;
    }

 
    async create(userEmail: string, userName: string, userPassword: string): Promise<boolean> {
        const query: string = `INSERT INTO Tiny_URL.Users VALUES ( '${userEmail}', '${userName}', '${userPassword}')`; 
        
        // TODO: parse the data data from RowDataPacker to User object.
        const isCreate: boolean = await this.database.Execute<boolean>(query); 
        return isCreate;
    }

    async read(userEmail: string): Promise<User> {
        const query = `SELECT * FROM Tiny_URL.Users where Email = '${userEmail}'`
        return await this.database.Execute<User>(query) ;
    }
}  