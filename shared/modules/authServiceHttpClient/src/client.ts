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
        return await this.httpClient.post(`${process.env.AUTH_SERVIVE_HOST}/api/autentication/signUp`, newUser)//process use - api.env, urlService.env
    }


    async login(credentials: Credentials): Promise<Token> {
        try {
            console.log("Try to send to auth the credentisls ", credentials);
            return await this.httpClient.get<Token>(`${process.env.AUTH_SERVIVE_HOST}/api/authentication/logIn`, { ...credentials })//process use - api.env, urlService.env
        } catch(err) { 
            console.log("error in Login " + err.response.status);
        }
    }

    async getEmail(token: Token): Promise<string> {
        try {
            return await this.httpClient.get<string>(`${process.env.AUTH_SERVIVE_HOST}/api/authentication/validationToken`, { ...token });//process use - api.env, urlService.env
        } catch(ex) {
            return new Promise((req, res) => { res(ex)})
        }
    }
}