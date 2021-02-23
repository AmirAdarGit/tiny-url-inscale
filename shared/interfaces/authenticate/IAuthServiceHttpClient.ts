import { Credentials, UserMetadata } from '../../models/common';
import { Token, ValidetionToken } from '../../models/authenticate';

export interface IAuthServiceHttpClient {
    login(credentials: Credentials): Promise<Token>
    signUp(credentials: Credentials, userMetadata: UserMetadata): Promise<void>
    getEmail(token: Token): Promise<string>
}