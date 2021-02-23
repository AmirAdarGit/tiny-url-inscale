import { Token } from '../../models/authenticate';


export interface IUrlServiceHttpClient {
    get(shortUrl: number, token: Token): Promise<string>
    create(userToken: Token, longUrl: string, email: string, isPrivate: boolean): Promise<string>
}