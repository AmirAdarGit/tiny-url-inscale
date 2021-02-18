import { Request, Response } from "express";
import { Credentials, UserMetadata} from "../../../shared/models/common"
import { Token } from "../../../shared/models/authenticate/index"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient";
import { Url } from "../../../shared/models/url/index"
import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";

export class AuthService {

    authHttpClient: IAuthServiceHttpClient;
    constructor(authServiceHttpClient: IAuthServiceHttpClient){
        this.authHttpClient = authServiceHttpClient;
    }

    async LogIn(credentials: Credentials): Promise<Token> {
        console.log("Auth-Service: Log in flow - credentials: ", credentials);
        return await this.authHttpClient.login(credentials);
    };
    
    
    async SignUp(userMetadata: UserMetadata, credentials: Credentials): Promise<void> {
            console.log(`Auth-Service: Sign Up flow - credentials: ", ${credentials} , - userMetadata : ${userMetadata}`);
            await this.authHttpClient.signUp(credentials, userMetadata);
    }




    
}