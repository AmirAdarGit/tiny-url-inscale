import { IAuthServiceHttpClient } from "../../../interfaces/authenticate/IAuthServiceHttpClient"
import { Credentials, UserMetadata } from '../../../models/common';
import { Token, ValidetionToken } from '../../../models/authenticate';
import { IHttpClient } from "../../../interfaces/httpClient";

export class AuthServiceHttpClient implements IAuthServiceHttpClient {

    httpClient: IHttpClient

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient
    }

    async SignUp(credentials: Credentials, userMetadata: UserMetadata): Promise<void> {
        console.log("Forwarding request to auth service");
       
        const newUser = {
            ...credentials,
            ...userMetadata
        }

        console.log("With new user: ", newUser);
        return await this.httpClient.Post(process.env.AUTH_SIGNUP_PATH, newUser)//process use - api.env, urlService.env
    }


    async Login(credentials: Credentials): Promise<Token> {
        try{
        console.log("Try to send to auth the credentisls ", credentials);
        return await this.httpClient.Get<Token>(process.env.AUTH_LOGIN_PATH, { ...credentials })//process use - api.env, urlService.env
        } catch(err){
            console.log("error in Login " + err.response.status);
        }
    }

    async UserValidetionToken(email: string, token: Token): Promise<void> {
        try{
            // console.log("Try to send to auth the Token and user email for validation ", validetionToken);
            return await this.httpClient.Get<void>(process.env.AUTH_VALID_TOKEN_USER_PATH, { email, ...token });//process use - api.env, urlService.env
        } catch(err){
            console.log("error in ValidetionToken " + err);
        }
    }
    
    async LinkValidetionToken(token: Token): Promise<void> {
        try{
            // console.log("Try to send to auth the Token and user email for validation ", token);
            return await this.httpClient.Get<void>(process.env.AUTH_VALID_TOKEN_LINK_PATH, { ...token });//process use - api.env, urlService.env
        } catch(err){
            console.log("error in ValidetionToken " + err);
        }
    }
}