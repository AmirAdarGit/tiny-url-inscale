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
            console.log(`[LogIn] - credentials: ${JSON.stringify(credentials)})}`)
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
            console.log(`[SignUp] - credentials: ${JSON.stringify(credentials)}, userMetadata: ${JSON.stringify(userMetadata)}`)
            await this.authService.SignUp(userMetadata, credentials);
            res.sendStatus(200);
        } catch (ex) {
            res.status(500).send(`${credentials.email} is already in use.`);
        }
    }
}