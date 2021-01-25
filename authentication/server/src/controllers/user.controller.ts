import {Request, Response} from "express"   
import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken' 
import * as dotenv from 'dotenv'
import { Credentials , UserMetadata} from "../../../../shared/models/common"
import { UserServiceHttpClient } from "../../../../shared/modules/userServiceHttpClient/client"
import { IUserServiceHttpClient } from "../../../../shared/interfaces/user/IUserServiceHttpClient"
import { User } from "../../../../shared/models/user/index"
dotenv.config() //use the jwt secet key 
import endpoint from "../../../../shared/modules/enviromentVairble/endpoint.config";

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
                console.log("in auth mocroservice, user logIn pass and encriptes pass match!");
                console.log("the Email is:", Email);
                console.log("access Token secret is:", endpoint.AccessTokenSecret);
                try {
                    const accessToken = jwt.sign(Email, endpoint.AccessTokenSecret)
                    console.log("logIn sucsses return the Token: ", accessToken);
                    res.status(200).send(accessToken);
                } catch {
                    console.log("Fail in create Token for the user , Email: ",Email);
                    console.log("Fail in create Token for the user Access token from env: ",process.env.ACCESS_TOKEN_SECRET);

                    res.status(402).send();

                }
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
