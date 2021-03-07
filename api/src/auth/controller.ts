import { Request, Response } from "express";
import { Credentials, UserMetadata} from "../../../shared/models/common"
import { Token } from "../../../shared/models/authenticate"
import { AuthService } from "./service";


export class AuthController {

    authService: AuthService;

    constructor(authService: AuthService){
        this.authService = authService;
    }

    async logIn(req: Request, res: Response): Promise<void> {
        
        const credentials: Credentials = {
            email: req.body.email,
            password: req.body.password,
        }

        try {
            const token: Token = await this.authService.LogIn(credentials);
            res.status(200).send(token); //return the Token to the user -> in future save it in the browser cookies.
        } catch (ex) {
            res.status(500).send(ex);
        }
    };
    
    
    async signUp(req: Request, res: Response): Promise<void> {
        
        const credentials: Credentials = {
            email: req.body.email,
            password: req.body.password
        }
    
        const userMetadata: UserMetadata = {
            name: req.body.name,
            newsletter: true // TODO: take newsletter from body.
        }
        
        try {
            await this.authService.SignUp(userMetadata, credentials);
            res.status(200).send(`User: ${credentials.email} has been created.`);
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
}