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

    async authenticateToken(req: Request, res: Response): Promise<void> {
        const token: Token = tokenUtils.getToken(req.headers.authorization)

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
        const userPassword: string = req.body.Password;

        const userMetadata: UserMetadata = {
            Name: req.body.Name,
            Newsletter: true
        }

        const credentials: Credentials = {
            email: req.body.Email,
            password: userPassword
        }
        try {
            const isSignUp: boolean = await this.authService.signUp(credentials, userMetadata);
            if (isSignUp) {
                res.status(200);
            } else {
                res.status(403).send(`Forbidden, cannot sign up for ${credentials.email}`);
            }
        } catch (ex) {
            console.log(`Failed creating user, error: ${ex}`);
            res.status(500).send(ex);
        }
    }

    async logIn (req:Request, res:Response): Promise<void> {

        const credentials: Credentials = {
            email: String(req.query.Email),
            password: String(req.query.Password)
        }

        try {
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