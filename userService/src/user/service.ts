import { Request, Response} from "express"   
import { User } from "../../../shared/models/user/index"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase"
import  * as errors  from "../../../shared/errors"
import { OkPacket, RowDataPacket } from "mysql";
export class UserService {

    private database: Idatabase;

    constructor(database: Idatabase) {
        this.database = database;
    }
 
    // TODO: Should return User
    async create(userEmail: string, userPassword: string, userName: string): Promise<boolean> {
        const query: string = `INSERT INTO tiny_url.Users VALUES ( '${userEmail}', '${userName}', '${userPassword}')`; 
        const isCreate: OkPacket = await this.database.Execute<OkPacket>(query); 
        if (isCreate) {
            console.log("success to insert to the database", isCreate);
            return true
        }
        if (!isCreate) { return new Promise ((res, rej) => { rej(new errors.DatabaseError("Fail to create new user"))})}
        return false;
    }

    async read(userEmail: string): Promise<User> {
        const query = `SELECT * FROM tiny_url.Users where Email = '${userEmail}'`
        const dbUser: RowDataPacket = await this.database.Execute<RowDataPacket>(query); 
        console.log("After selecting the user from the db: ", dbUser);
        if (!dbUser) { return new Promise ((res, rej) => { rej(new errors.DatabaseError("Fail to get user"))})}
        const newUser: User = new User(dbUser[0]);
        newUser.print();        
        return newUser
    }
}  