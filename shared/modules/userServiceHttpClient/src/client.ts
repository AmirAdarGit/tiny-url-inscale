import { IUserServiceHttpClient } from "../../../interfaces/user/IUserServiceHttpClient"
import { Credentials, UserMetadata } from "../../../models/common";
import { User } from "../../../models/user";
import { HttpClient } from "../../httpClient/src/HttpClient";

export class UserServiceHttpClient implements IUserServiceHttpClient {

    httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async get(email: string): Promise<User> {
        return this.httpClient.get<User>(process.env.USER_SERVICE_PATH, { email })
    }

    async create(credentials: Credentials, userMetadata: UserMetadata): Promise<void> {
        const newUser = {
            ...credentials,
            ...userMetadata
        }
        return this.httpClient.post<void>(process.env.USER_SERVICE_PATH, newUser)
    }
}