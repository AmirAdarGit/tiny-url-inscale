import { Request, Response} from "express"   
import { User } from "../../../shared/models/user/index"
import { UserService } from "./service";

export class UserController {

    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    // TODO: check if the data is in req.body but send in the credentionals, user metadate
    
    async post(req:Request, res:Response): Promise<void> {
        const userEmail: string = req.body.Email;
        const userPassword: string = req.body.Password;
        const userFullName: string = req.body.Name;

        try {
            const CreateUser: boolean = await this.userService.create(userEmail, userPassword, userFullName);
            if (CreateUser) {
                res.status(200).send(CreateUser);
            } else { res.status(404).send("Forbidden, cannot create new User") }
        } catch (ex) {
            res.status(500).send(ex);
        }    
    };

    async get(req:Request, res:Response): Promise<void> {
        const userEmail: string = String(req.query.email);// param instend of query because get does not have body, but params.
       
        try {
            const user: User = await this.userService.read(userEmail); 
            if(user) {
                res.send(200).send(user)
            } else { res.status(404).send("Forbidden, cannot get User properties") }
        } catch (ex) {
            res.status(500).send(ex);
        }
    };
}