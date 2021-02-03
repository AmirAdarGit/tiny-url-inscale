import { Credentials, UserMetadata } from '../../models/common';
import { Token, ValidetionToken } from '../../models/authenticate';

export interface IAuthServiceHttpClient {
    Login(credentials: Credentials): Promise<Token>
    SignUp(credentials: Credentials, userMetadata: UserMetadata): Promise<void>
    UserValidetionToken(email: string, token: Token): Promise<void>
    LinkValidetionToken(token: Token): Promise<void>

}