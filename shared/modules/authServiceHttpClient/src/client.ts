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
        return this.httpClient.Post("http://authentication:8080/api/autentication/signUp", newUser)
    }

    async Login(credentials: Credentials): Promise<Token> {
        try{
        console.log("Try to send to auth the credentisls ", credentials);
        return this.httpClient.Get<Token>("http://authentication:8080/api/autentication/logIn", { ...credentials })
        } catch(err){
            console.log("error in Login " + err.response.status);
        }
    }

    async ValidetionToken(validetionToken: ValidetionToken): Promise<void> {
        try{
            console.log("Try to send to auth the Token and user email for validation ", validetionToken);
            return this.httpClient.Get<void>("http://authentication:8080/api/autentication/validationToken", { ...validetionToken });
        } catch(err){
            console.log("error in ValidetionToken " + err);
        }
    }

}