import { IAuthServiceHttpClient } from "../../../interfaces/authenticate/IAuthServiceHttpClient"
import { Credentials, UserMetadata } from '../../../models/common';
import { Token } from '../../../models/authenticate';
import { IHttpClient } from "../../../interfaces/httpClient";
import { api, authentication, signUp, logIn, authenticateToken } from "../../../const"

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
        return await this.httpClient.post(`${process.env.AUTH_SERVICE_HOST}/${api}/${authentication}/${signUp}`, newUser)
    }


    async login(credentials: Credentials): Promise<Token> {
            return await this.httpClient.get<Token>(`${process.env.AUTH_SERVICE_HOST}/${api}/${authentication}/${logIn}`, { ...credentials })
    }

    async getEmail(token: Token): Promise<string> {
            return await this.httpClient.get<string>(`${process.env.AUTH_SERVICE_HOST}/${api}/${authentication}/${authenticateToken}`, { ...token });
    }
}