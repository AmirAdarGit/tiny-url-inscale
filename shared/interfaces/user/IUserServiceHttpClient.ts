import { Credentials, UserMetadata } from '../../models/common';
import { User } from '../../models/user';


export interface IUserServiceHttpClient {
    get(email: string): Promise<User>
    create(credentials: Credentials, userMetadata: UserMetadata): Promise<void>
}