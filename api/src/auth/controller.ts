import { Request, Response } from "express";
import { Credentials, UserMetadata} from "../../../shared/models/common"
import { Token } from "../../../shared/models/authenticate"
import { AuthService } from "./service";


export class AuthController {

    authService: AuthService;

    constructor(authService: AuthService){
        this.authService = authService;
    }

    async LogIn(req: Request, res: Response): Promise<void> {
        
        const credentials: Credentials = {
            Email: req.body.userEmail,
            Password: req.body.userPassword,
        }

        try {
            const token: Token = await this.authService.LogIn(credentials);
            res.status(200).send(token); //return the Token to the user -> in future save it in the browser cookies.
        } catch (ex) {
            res.status(500).send(ex);
        }
    };
    
    
    async SignUp(req: Request, res: Response): Promise<void> {
    
        const credentials: Credentials = {
            Email: req.body.userEmail,
            Password: req.body.userPassword
        }
    
        const userMetadata: UserMetadata = {
            Name: req.body.userFullName,
            Newsletter: true // TODO: take newsletter from body.
        }
        
        try {
            await this.authService.SignUp(userMetadata, credentials);
            res.status(200).send(`User: ${credentials.Email} has been created.`);
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
}