import {Request, Response} from "express"   
import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken' 
import { Credentials , UserMetadata} from "../../../../shared/models/common"
import { UserServiceHttpClient } from "../../../../shared/modules/userServiceHttpClient/client"
import { IUserServiceHttpClient } from "../../../../shared/interfaces/user/IUserServiceHttpClient"
import { User } from "../../../../shared/models/user/index"



export class UserController{

    userHttpClient: IUserServiceHttpClient;

    constructor(userServiceHttpClient: IUserServiceHttpClient){
        this.userHttpClient = userServiceHttpClient;
    }

    async SignUp (req:Request, res:Response): Promise<void> {   
        const userPassword: string = req.body.Password;
        const salt = await bcrypt.genSalt(); //generate the salt for the deferent encripted password
        const hashPassword = await bcrypt.hash(userPassword, salt);

        const userMetadata: UserMetadata = {
            Name: req.body.Name,
            Newsletter: true
        }

        const credentials: Credentials = {
            Email: req.body.Email,
            Password: hashPassword
        }

        try {
            await this.userHttpClient.Create(credentials, userMetadata);
            res.status(200).send();
        } catch (ex) {
            console.log(`Failed creating user, error: ${ex.response.status}`);
            if(ex.response.status == 409){
                res.status(409).send();
            } else {
                res.status(500).send();
            }
        }
    };


    async LogIn (req:Request, res:Response): Promise<void> {

        const credentials: Credentials = {
            Email: String(req.query.Email),
            Password: String(req.query.Password)
        }

        console.log(`user neme: ${credentials.Email}, user password: ${credentials.Password}`);
        try {
            const user: User = await this.userHttpClient.Get(credentials.Email);
            console.log("in auth microservice with the user encripted pass:", user);

            const { Password } = user; // extract the encoded password
            const { Email } = user; // extract the encoded password

            if(await bcrypt.compare(credentials.Password, Password)){
            
                const accessToken = jwt.sign(Email, process.env.ACCESS_TOKEN_SECRET)
                res.status(200).send(accessToken);
            }
            else {
                res.status(405).send("access not allowd, change the user password and try agian");
            }

            res.status(200).send(user);
        } catch (ex) {
            console.log(`Failed creating user, error: ${ex.response.status}`);
            if(ex.response.status == 409){
                res.status(409).send();
            } else {
                res.status(500).send();
            }
        }
    };
}    
