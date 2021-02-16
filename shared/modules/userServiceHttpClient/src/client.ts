import { IUserServiceHttpClient } from "../../../interfaces/user/IUserServiceHttpClient"
import { Credentials, UserMetadata } from "../../../models/common";
import { User } from "../../../models/user";
import { HttpClient } from "../../httpClient/src/HttpClient";

export class UserServiceHttpClient implements IUserServiceHttpClient {

    httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async Get(email: string): Promise<User> {
        return this.httpClient.Get<User>(process.env.USER_SERVICE_PATH, { email })
    }

    async Create(credentials: Credentials, userMetadata: UserMetadata): Promise<void> {
        const newUser = {
            ...credentials,
            ...userMetadata
        }
        return this.httpClient.Post<void>(process.env.USER_SERVICE_PATH, newUser)
    }
}