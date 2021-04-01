import { Request, Response} from "express"   
import { User } from "../../../shared/models/user/index"
import { UserService } from "./service";
import { OkPacket } from "mysql";

export class UserController {

    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    // TODO: check if the data is in req.body but send in the credentionals, user metadate
    
    async post(req:Request, res:Response): Promise<void> {
        const userEmail: string = req.body.email;
        const userPassword: string = req.body.password;
        const userFullName: string = req.body.name;

        console.log(`[Create] with args - email: ${userEmail}, password: ${userPassword}, name: ${userFullName}`)
    
        try {
            const createUser: boolean = await this.userService.create(userEmail, userPassword, userFullName);
            console.log("tryy 1",createUser);
            if (createUser) {
                res.sendStatus(200);
            } else {
                res.status(404).send("Forbidden, cannot create new user") 
            }
        } catch (ex) {
            res.status(500).send(ex);
        }    
    }

    async get(req:Request, res:Response): Promise<void> {
        const userEmail: string = String(req.query.email);// param instend of query because get does not have body, but params.
       
        try {
            const user: User = await this.userService.read(userEmail); 
            if(user) {
                res.status(200).send(user)
            } else { res.status(404).send("Forbidden, cannot get User properties") }
        } catch (ex) {
            res.status(500).send(ex);
        }
    }    
}