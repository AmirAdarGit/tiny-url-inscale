import { IUserServiceHttpClient } from "../../../interfaces/user/IUserServiceHttpClient"
import { IHttpClient } from "../../../interfaces/httpClient"
import { Credentials, UserMetadata } from "../../../models/common";
import { User } from "../../../models/user";
import { api, user } from "../../../const"

export class UserServiceHttpClient implements IUserServiceHttpClient {

    httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient;
    }

    async get(email: string): Promise<User> {
        return await this.httpClient.get<User>(`${process.env.USER_SERVICE_PATH}${api}${user}`, { email })
    }

    async create(credentials: Credentials, userMetadata: UserMetadata): Promise<boolean> {
        const newUser = {
            ...credentials,
            ...userMetadata
        }
        return await this.httpClient.post<boolean>(`${process.env.USER_SERVICE_PATH}${api}${user}`, newUser)
    }
}