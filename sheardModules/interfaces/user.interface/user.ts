import { Credentials, UserMetadata } from '../sheard.interfaces/Isheard';


export interface IUserServiceHttpClient {
    getEncriptedUserPass(Credentials: Credentials): Promise<String>
    addUserToDB(credentials: Credentials ,userMetadata: UserMetadata): Promise<void>
}