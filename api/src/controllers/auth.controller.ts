import { Request, Response } from "express";
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
import { Credentials, UserMetadata} from "../../../shared/models/common"
import { Token } from "../../../shared/models/authenticate/Token"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient";

export class AuthController {
    
    authHttpClient: IAuthServiceHttpClient;

    constructor(httpClient: IAuthServiceHttpClient){
        this.authHttpClient = httpClient;
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
                res.status(405).send("Error user Email, or user Password.");
            }
            console.log(`Faild creating token, err ${ex}`);
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

}