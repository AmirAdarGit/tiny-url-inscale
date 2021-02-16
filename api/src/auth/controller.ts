import { Request, Response } from "express";
import { Credentials, UserMetadata} from "../../../shared/models/common"
import { Token } from "../../../shared/models/authenticate/index"
import { Url } from "../../../shared/models/url/index"
import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";
import { AuthService } from "./service";


export class AuthController {

    authService: AuthService;

    constructor(authService: AuthService){
        this.authService = authService;
    }

    async LogIn(req: Request, res: Response): Promise<void> {
        
        const credentials: Credentials = {
            Email: req.body.userEmail,
            Password: req.body.userPassword
        }

        try {
            console.log("Api-Module: success to get the body credentials", credentials);
            const logInResponse: Token = await this.authService.LogIn(credentials);
            if (String(logInResponse) == '405') {
                res.status(405).send("error Password"); 
            } 
            if (String(logInResponse) == '404') {
                res.status(404).send("error Email"); 
            } else {
                console.log(`Api-Module: logIn successfully, resive token ${logInResponse.Value}`);
                res.status(200).send(logInResponse);//return the Token to the user -> in future save it in the browser cookies.
            }
        } catch (ex) {
                console.log(`Api-Module: Faild creating token:  ${ex}`);
                res.status(500).send();
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
            console.log("Api-Module: statuse 200 ")
            res.status(200).send();
        } catch (ex) {
            console.log(`Api-Module: Failed signing up : ${ex}`)
            if (ex.response.status == 409) {
                res.status(409).send("User already exist, try another User Email.");
            } else {
                res.status(500).send({ ex });
            }
        }
    }
 
    async CreateUrl (req:Request, res:Response):Promise<void> {

        const Usertoken: Token = {
            Value: req.headers.authorization.split(" ")[1]
        }
        const reqEmail: string = req.body.Email   

        try {
            //first steps, check the user token that attached to the header
            const response = await this.authHttpClient.UserValidetionToken(reqEmail, { ...Usertoken });
            console.log("Api-Module: response from Authenticate module validation token:", response);
            if (String(response) == 'Token error') {
                res.status(403).send('Token error')
            } else if (String(response) == 'Email error') {
                res.status(403).send('Email error')
            } else {
                //second step, send http request to Url-Service
                try {
                    const url: Url = {
                        LongUrl : req.body.LongURL,
                        Email : req.body.Email,
                        IsPrivate : Boolean(req.body.IsPrivate)
                    }
                    const shortUrl = await this.urlHttpClient.Create(url);
                    console.log(`Api-Module: new url - ${shortUrl}`);   
                    res.status(200).send("Token verified, shortUrl - (number)/" + shortUrl);             
                } catch (ex) {
                    console.log(`Api-Module: Failed create new short url: ${ex}`)
                    res.status(500).send();
                }
            }
        } catch (ex) {
            if (ex.response.status == 403) {
                console.log(`Api-Module: Failed create new short url: ${ex}`)
                res.status(403).send("invalid token");
            } else {
                res.status(500).send();
            }
        }
    }
}