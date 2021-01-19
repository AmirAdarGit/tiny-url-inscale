import { Credentials, UserMetadata } from '../../models/common';
import { User } from '../../models/user';


export interface IUserServiceHttpClient {
    Get(email: string): Promise<User>
    Create(credentials: Credentials, userMetadata: UserMetadata): Promise<void>
}