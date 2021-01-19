import { Credentials, UserMetadata } from '../../models/common';
import { Token } from '../../models/authenticate';

export interface IAuthServiceHttpClient {
    Login(credentials: Credentials): Promise<Token>
    SignUp(credentials: Credentials, userMetadata: UserMetadata): Promise<void>
}