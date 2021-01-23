import { IAuthServiceHttpClient } from "../../../interfaces/authenticate/IAuthServiceHttpClient"
import { Credentials, UserMetadata } from '../../../models/common';
import { Token } from '../../../models/authenticate';
import { IHttpClient } from "../../../interfaces/httpClient";

export class AuthServiceHttpClient implements IAuthServiceHttpClient {

    httpClient: IHttpClient

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient
    }

    async SignUp(credentials: Credentials, userMetadata: UserMetadata): Promise<void> {
        const newUser = {
            ...credentials,
            ...userMetadata
        }
        return this.httpClient.Post("http://authentication:8080/api/autentication/signUp", newUser)
    }

    async Login(credentials: Credentials): Promise<Token> {
        try{
        return this.httpClient.Get<Token>("http://authentication:8080/api/autentication/login", { ...credentials })
        } catch(err){
            console.log("error in Login " + err.response.status);
        }
    }



}