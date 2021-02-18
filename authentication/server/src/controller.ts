import {Request, Response} from "express"   
import { Credentials , UserMetadata} from '../../../shared/models/common/index'
import { Token } from '../../../shared/models/authenticate/index'
import { AuthService } from "./service"

export class AuthController {

    authService: AuthService;

    constructor(authServise: AuthService){
        this.authService = authServise;
    }

    async isValid(req: Request, res: Response): Promise<boolean> {

        return
    }


    async signUp (req: Request, res: Response): Promise<void> {   
        const userPassword: string = req.body.Password;

        const userMetadata: UserMetadata = {
            Name: req.body.Name,
            Newsletter: true
        }

        const credentials: Credentials = {
            Email: req.body.Email,
            Password: userPassword
        }
        try {
            await this.authService.signUp(credentials, userMetadata);
            res.status(200);
        } catch (ex) {
            console.log(`Failed creating user, error: ${ex}`);
            res.status(500).send(ex);
        }
    };

    async logIn (req:Request, res:Response): Promise<Token> {

        const credentials: Credentials = {
            Email: String(req.query.Email),
            Password: String(req.query.Password)
        }

        try {
            const token: Token = await this.authService.logIn(credentials);
            res.status(200).send(token);
        } catch (ex) {
            return new Promise((res, rej) => {
                rej(ex);
            })
        }
           
    }
    
}    
