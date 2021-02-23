import {Request, Response} from "express"   
import { Credentials , UserMetadata} from '../../../shared/models/common/index'
import { Token } from '../../../shared/models/authenticate/index'
import { AuthService } from "./service"
import { tokenUtils } from "../../../shared/jwtToken/tokenUtils"

export class AuthController {

    authService: AuthService;

    constructor(authServise: AuthService){
        this.authService = authServise;
    }

    authenticateToken(req: Request, res: Response): Promise<void> {
        const token: string = tokenUtils.getToken(req.headers.authorization)

        const userToken: Token = new Token(token)
        
        try{
            const email = this.authService.authenticate(userToken);
            if (email) {
                res.status(200).send(email);
            } else {
                return new Promise ((res, rej) => { rej(`Unauthorized Token`)})
            } 
        } catch (ex) {
            res.status(500).send(ex)
        }
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
            const isSignUp: boolean = await this.authService.signUp(credentials, userMetadata);
            if (isSignUp) {
                res.status(200);
            } else {
                return new Promise ((res, rej) => { rej(`Unauthorized Token`)})
            }
        } catch (ex) {
            console.log(`Failed creating user, error: ${ex}`);
            res.status(500).send(ex);
        }
    }

    async logIn (req:Request, res:Response): Promise<void> {

        const credentials: Credentials = {
            Email: String(req.query.Email),
            Password: String(req.query.Password)
        }

        try {
            const token: Token = await this.authService.logIn(credentials);
            if(!token) { return new Promise((req, res) => res("Invalid token."))}
            res.status(200).send(token);
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
}    