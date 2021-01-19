import { IAuthServiceHttpClient } from "../../interfaces/authenticate"
import { Credentials, UserMetadata } from '../../models/common';
import { Token } from '../../models/authenticate';
import { HttpClient } from "../httpClient/httpClient";

export class AuthServiceHttpClient implements IAuthServiceHttpClient {

    httpClient: HttpClient

    constructor() {
        this.httpClient = new HttpClient()
    }

    async Login(credentials: Credentials): Promise<Token> {
        var a = new HttpClient()
        return a.Post<Token>("http://localhost:8090/api/autentication/login", { ...credentials })
    }

    async SignUp(credentials: Credentials, userMetadata: UserMetadata): Promise<void> {
        const newUser = {
            ...credentials,
            ...userMetadata
        }

        return a.Post("http://localhost:8090/api/autentication/signUp", newUser)
    }

}