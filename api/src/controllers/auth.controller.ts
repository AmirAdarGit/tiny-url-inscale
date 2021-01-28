import { Request, Response } from "express";
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
import { Credentials, UserMetadata} from "../../../shared/models/common"
import { Token, ValidetionToken } from "../../../shared/models/authenticate/index"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient";
import { Url } from "../../../shared/models/url/index"
import { TokenClass, tokenToString } from "typescript";
import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";
export class AuthController {
    
    authHttpClient: IAuthServiceHttpClient;
    urlHttpClient: IUrlServiceHttpClient;

    constructor(authServiceHttpClient: IAuthServiceHttpClient, urlServiceHttpClient: IUrlServiceHttpClient){
        this.authHttpClient = authServiceHttpClient;
        this.urlHttpClient = urlServiceHttpClient;
    }

    async LogIn(req: Request, res: Response): Promise<void> {
        
        const credentials: Credentials = {
            Email: req.body.userEmail,
            Password: req.body.userPassword
        }
    console.log("success to get the body credentials", credentials);
    
        try {
            const logInResponse: Token = await this.authHttpClient.Login(credentials);

            console.log(`logIn successfully, resive token ${logInResponse}`);
            console.log(`logIn successfully, resive token ${logInResponse.Value}`);
        
            res.status(200).send(logInResponse);
        
        } catch (ex) {
            if(ex.response.status == 405){
                res.status(405).send("Error user Password.");
            }
            if(ex.response.status == 404){
                res.status(404).send("Error user Email, no such user.");
            }
            else{
                console.log(`Faild creating token, err ${ex}`);
                res.status(500).send();
            }
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
            await this.authHttpClient.SignUp(credentials, userMetadata);
            res.status(200).send();
        } catch (ex) {
            console.log(`Failed signing up, error: ${ex}`)
            if(ex.response.status == 409) {
                res.status(409).send();
            } else {
                res.status(500).send({ ex });
            }
        }
    }

    async CreateUrl (req:Request, res:Response):Promise<void> {

        // first step, check if the token is valid.
        const Usertoken: Token = {
            Value: req.headers.authorization.split(" ")[1]
        }
        const validetionToken: ValidetionToken = {    
            Token: Usertoken,
            Email: req.body.Email,
        }
        console.log("Api-Module: success to get the user Token", validetionToken);

        try{
            await this.authHttpClient.ValidetionToken(validetionToken);
            //second step, send http request to Url-Service
            try{
                const url: Url = {
                    LongUrl : req.body.LongURL,
                    Email : req.body.Email,
                    IsPrivate : Boolean(req.body.IsPrivate)
                }
                const shortUrl = await this.urlHttpClient.Create(url);
                console.log(`Api-Module: new url - ${shortUrl}`);   
                res.status(200).send("Token verified, shortUrl - (number): " + shortUrl);             
            } catch(ex){
                console.log('Api-Module: Error create new Url');
                res.status(500).send();
            }
        } catch (ex){
            if(ex.response.status == 403){
                console.log('Api-Module: Error token validation');
                res.status(403).send("invalid token");
            }
            else{
                res.status(500).send();
        
            }
        }




    }

}