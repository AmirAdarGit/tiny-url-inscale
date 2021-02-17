import { Request, Response} from "express"   
import { parseInsertQueryToString, parseGetQueryToString } from "../databaseUserQuery/queries"
import { User } from "../../../shared/models/user/index"
import { SignUpProducer } from '../produce.email.sqs/produce';
import { Idatabase } from '../../../shared/interfaces/database/Idatabase' 
import * as mysql from 'mysql'
import { UserService } from "./service";

export class UserController {

    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async Post(req:Request, res:Response): Promise<void> {

        const userEmail: string = req.body.Email;
        const userPassword: string = req.body.Password;
        const userFullName: string = req.body.Name;

        try {
            console.log("User Service module - Forwording adding new user to mySql DB. ");
            const insertQuery: string = parseInsertQueryToString(userEmail, userFullName, userPassword); 
            const response: mysql.OkPacket = await this.userService.database.Execute<mysql.OkPacket>(insertQuery);//send the query to mysql db 
            console.log("User Service module - db response ", response);

            await this.userService.signUpProducer.SqSProduceSignUp(userEmail);
            console.log("User Service module - new user has been added to mySql DB ")
            res.status(200).send();        
        } catch (ex) {
            if (ex.code === 'ER_DUP_ENTRY') {//exeptions from the query response
                res.status(409).send("Error, user email is already exist, change User Email.");
            } else {
                res.status(500).send(ex);
            }
        }    
    };

    async Get(req:Request, res:Response): Promise<void> {

        const userEmail: string = String(req.query.email);// param instend of query because get does not have body, but params.
        const getUserPassQuery: string = parseGetQueryToString(userEmail);
        try {
            const userPassword: mysql.RowDataPacket = await this.userService.database.Execute<mysql.RowDataPacket>(getUserPassQuery); // recive the encoded pass from the db
            if(userPassword[0] == '') {
                res.status(404).send("User email does not found");
            } else {
                const user: User = { // generate the response user info
                    Email: userEmail,
                    Password: userPassword[0].UserPassword
                }
                res.status(200).send(user);
            }
        } catch (ex) {
            return new Promise((_, reject) => {
                reject(ex)
            })
        }
    };
}