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
            console.log("[AuthServiceHttpClient] - LogIn", credentials)
            return await this.httpClient.post<Token>(`${process.env.AUTH_SERVICE_HOST}/${api}/${authentication}/${logIn}`, { ...credentials })
    }

    async getEmail(token: Token): Promise<string> {
        console.log("[AuthServiceHttpClient] - GetEmail", token.value);
            return await this.httpClient.post<string>(`${process.env.AUTH_SERVICE_HOST}/${api}/${authentication}/${authenticateToken}`, { ...token });
    }
}