import { Request, Response} from "express"   
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
            const user: User = await this.userService.Create(userEmail, userPassword, userFullName);
            res.status(200).send(user);        
        } catch (ex) {
            res.status(500).send(ex);
        }    
    };

    async Get(req:Request, res:Response): Promise<void> {
        const userEmail: string = String(req.query.email);// param instend of query because get does not have body, but params.
       
        try {
            const user: User = await this.userService.Read(userEmail); // recive the encoded pass from the db
            
            if(user) {
                res.status(200).send(user);
            } else {
                res.status(404).send("User email does not found");
            }
        } catch (ex) {
            res.status(500).send(ex);
        }
    };
}