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
       
        const newUser = {
            ...credentials,
            ...userMetadata
        }
        return await this.httpClient.post(`${process.env.AUTH_SERVICE_HOST}/api/autentication/signUp`, newUser)//process use - api.env, urlService.env
    }


    async login(credentials: Credentials): Promise<Token> {
            return await this.httpClient.get<Token>(`${process.env.AUTH_SERVICE_HOST}/api/authentication/logIn`, { ...credentials })//process use - api.env, urlService.env
    }

    async getEmail(token: Token): Promise<string> {
            return await this.httpClient.get<string>(`${process.env.AUTH_SERVICE_HOST}/api/authentication/authenticateToken`, { ...token });//process use - api.env, urlService.env
    }
}