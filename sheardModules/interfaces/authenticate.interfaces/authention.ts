import { Credentials, UserMetadata, Token } from '../sheard.interfaces/Isheard';

export interface IAuthServiceHttpClient {
    Login(credentials: Credentials): Promise<Token>
    SignUp(credentials: Credentials, userMetadata: UserMetadata): Promise<void>
}