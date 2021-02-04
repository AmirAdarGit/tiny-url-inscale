import endpoint from "../../../../shared/environmentVirables/src/endpoint.confige";
import * as dotenv from 'dotenv'
dotenv.config() //use the jwt secet key 
import {Request, Response} from "express"   
import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken' 
import { Credentials , UserMetadata} from "../../../../shared/models/common"
import { UserServiceHttpClient } from "../../../../shared/modules/userServiceHttpClient/client"
import { IUserServiceHttpClient } from "../../../../shared/interfaces/user/IUserServiceHttpClient"
import { User } from "../../../../shared/models/user/index"
import { Token } from "../../../../shared/models/authenticate/Token"

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
            console.log("Authenticate-Service-Module: user properties for validation user password, ", user);

            const { Password } = user; // extract the encoded password
            const { Email } = user; // extract the encoded password

            //compare the user request password, with the encoded password wich generate in user singUp.
            if(await bcrypt.compare(credentials.Password, Password)){ 
                try {
                    console.log("Authenticate-Service-Module: Log in success, Forward generate new user Token");
                    console.log(endpoint.AccessTokenSecret);
                    const value = jwt.sign({email: Email}, endpoint.AccessTokenSecret );//create the Token with user email inside.
                    console.log("logIn sucsses return the Token: ", value);
                    
                    const token: Token = {
                        Value: value 
                    }
                    
                    res.status(200).send(token);
                } catch {

                    console.log("Fail in create Token for the user , Email: ",Email);
                    console.log("Fail in create Token for the user Access token from env: ", endpoint.AccessTokenSecret );
                    res.send(417); //Fail creating the User Token.
                }
            }
            else {
                res.send("405");
            }

        } catch (ex) {
            console.log(`Failed geting user info from the DB, error: ${ex.response.status}`);
            if(ex.response.status == 409){ //duplicate email
                res.send("409");
            } 
            if(ex.response.status == 404){ //email not found in DB
                res.send("404");
            } else {
                res.send("500");
            }
        }
    };
}    
