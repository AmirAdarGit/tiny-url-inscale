import { IAuthServiceHttpClient } from "../../../interfaces/authenticate/IAuthServiceHttpClient"
import { Credentials, UserMetadata } from '../../../models/common';
import { Token } from '../../../models/authenticate';
import { IHttpClient } from "../../../interfaces/httpClient";

export class AuthServiceHttpClient implements IAuthServiceHttpClient {

    httpClient: IHttpClient

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient
    }

    async signUp(credentials: Credentials, userMetadata: UserMetadata): Promise<void> {
        console.log("Forwarding request to auth service");
       
        const newUser = {
            ...credentials,
            ...userMetadata
        }

        console.log("With new user: ", newUser);
        return await this.httpClient.post(process.env.AUTH_SIGNUP_PATH, newUser)//process use - api.env, urlService.env
    }


    async login(credentials: Credentials): Promise<Token> {
        try {
            console.log("Try to send to auth the credentisls ", credentials);
            return await this.httpClient.get<Token>(process.env.AUTH_LOGIN_PATH, { ...credentials })//process use - api.env, urlService.env
        } catch(err) { 
            console.log("error in Login " + err.response.status);
        }
    }

    async getEmailFromTheToken(token: Token): Promise<string> {
        try {
            // console.log("Try to send to auth the Token and user email for validation ", token);
            return await this.httpClient.get<string>(process.env.AUTH_ENDPOINT_VALID_TOKEN_LINK_PATH, { ...token });//process use - api.env, urlService.env
        } catch(err) {
            
            console.log("error in ValidetionToken " + err);
        }
    }


    async userValidetionToken(email: string, token: Token): Promise<void> {
        try {
            // console.log("Try to send to auth the Token and user email for validation ", validetionToken);
            return await this.httpClient.get<void>(process.env.AUTH_VALID_TOKEN_USER_PATH, { email, ...token });//process use - api.env, urlService.env
        } catch(err) {
            console.log("error in ValidetionToken " + err);
        }
    }
    

}