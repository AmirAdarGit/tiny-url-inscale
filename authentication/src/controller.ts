import {Request, Response} from "express"   
import { Credentials , UserMetadata} from '../../shared/models/common/index'
import { Token } from '../../shared/models/authenticate/index'
import { AuthService } from "./service"
import { tokenUtils } from "../../shared/jwtToken/tokenUtils"
import { EQUALITY_BINARY_OPERATORS } from "@babel/types"
import { ValidationError } from "../../shared/errors"

export class AuthController {

    authService: AuthService;

    constructor(authServise: AuthService){
        this.authService = authServise;
    }

    async authenticateToken(req: Request, res: Response): Promise<void> {
        // const token: Token = tokenUtils.getToken(req.headers.authorization)

        const token: Token = new Token(req.body.value);
        console.log("[Authentication] - req ",token);
        try{
            const email = this.authService.authenticate(token);
            if (email) {
                res.status(200).send(email);
            } else {
                res.status(401).send("Unauthorized Token")
            } 
        } catch (ex) {
            res.status(500).send(ex)
        }
    };

    async signUp (req: Request, res: Response): Promise<void> {   
        const userPassword: string = req.body.password;
        const userMetadata: UserMetadata = {
            name: req.body.name,
            newsletter: true
        }

        const credentials: Credentials = {
            email: req.body.email,
            password: userPassword
        }
        try {
            await this.authService.signUp(credentials, userMetadata);
            res.sendStatus(200);
        } catch (ex) {
            if(ex instanceof ValidationError) {
                res.status(403).send(`Forbidden, cannot sign up for ${credentials.email}`);
            } else {
                res.status(500).send(`${credentials.email} is already in use.`);
            }
        }
    }

    async logIn (req:Request, res:Response): Promise<void> {

        const credentials: Credentials = {
            email: String(req.body.email),
            password: String(req.body.password)
        }

        try {
            console.log("[Authentication] LogIn - ", JSON.stringify(credentials))
            const token: Token = await this.authService.logIn(credentials);
            
            if(!token) { 
                res.status(403).send(`Forbidden, cannot log in for ${credentials.email}`)
            } else {
                res.status(200).send(token);
            }
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
}    