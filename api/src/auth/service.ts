import { Request, Response } from "express";
import { Credentials, UserMetadata} from "../../../shared/models/common"
import { Token } from "../../../shared/models/authenticate/index"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient";

export class AuthService {

    authHttpClient: IAuthServiceHttpClient;
    
    constructor(authServiceHttpClient: IAuthServiceHttpClient){
        this.authHttpClient = authServiceHttpClient;
    }

    async LogIn(credentials: Credentials): Promise<Token> {
        return await this.authHttpClient.login(credentials);
    };
    
    async SignUp(userMetadata: UserMetadata, credentials: Credentials): Promise<void> {
            await this.authHttpClient.signUp(credentials, userMetadata);
    }
}