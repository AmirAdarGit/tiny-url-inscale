import { Request, Response} from "express"   
import { User } from "../../../shared/models/user/index"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase"
import  * as errors from "./errors"
export class UserService {

    private database: Idatabase;

    constructor(database: Idatabase) {
        this.database = database;
    }
 
    async create(userEmail: string, userPassword: string, userName: string): Promise<boolean> {
        const query: string = `INSERT INTO Tiny_URL.Users VALUES ( '${userEmail}', '${userName}', '${userPassword}')`; 
        const isCreate: boolean = await this.database.Execute<boolean>(query); 
        if (!isCreate) { return new Promise ((res, rej) => { rej(new errors.DatabaseError("Fail to create new user"))})}
        return isCreate;
    }

    async read(userEmail: string): Promise<User> {
        const query = `SELECT * FROM Tiny_URL.Users where Email = '${userEmail}'`
        const user : User = await this.database.Execute<User>(query); 
        if (!user) { return new Promise ((res, rej) => { rej(new errors.DatabaseError("Fail to get user"))})}
        return user;
    }
}  