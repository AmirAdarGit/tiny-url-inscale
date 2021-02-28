import { IUserServiceHttpClient } from "../../../interfaces/user/IUserServiceHttpClient"
import { Credentials, UserMetadata } from "../../../models/common";
import { User } from "../../../models/user";
import { HttpClient } from "../../httpClient/src/HttpClient";

export class UserServiceHttpClient implements IUserServiceHttpClient {

    httpClient: HttpClient;
    userPath: string = '/api/user';

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async get(email: string): Promise<User> {
        return await this.httpClient.get<User>(`${process.env.USER_SERVICE_PATH}/api/user`, { email })
    }

    async create(credentials: Credentials, userMetadata: UserMetadata): Promise<boolean> {
        const newUser = {
            ...credentials,
            ...userMetadata
        }
        return await this.httpClient.post<boolean>(`${process.env.USER_SERVICE_PATH}/api/user`, newUser)
    }
}