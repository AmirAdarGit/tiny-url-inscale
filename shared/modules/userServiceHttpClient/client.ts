import { IUserServiceHttpClient } from "../../interfaces/user/IUserServiceHttpClient"
import { Credentials, UserMetadata } from "../../models/common";
import { User } from "../../models/user";
import { HttpClient } from "../httpClient/httpClient";

export class UserServiceHttpClient implements IUserServiceHttpClient {

    httpClient: HttpClient

    constructor() {
        this.httpClient = new HttpClient()
    }

    async Get(email: string): Promise<User> {
        return this.httpClient.Get<User>("http://localhost:8070/api/user", { email })
    }

    async Create(credentials: Credentials, userMetadata: UserMetadata): Promise<void> {
        const newUser = {
            ...credentials,
            ...userMetadata
        }
        
        return this.httpClient.Post<void>("http://localhost:8070/api/user", newUser)
    }

}