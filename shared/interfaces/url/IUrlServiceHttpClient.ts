import { Token } from '../../models/authenticate';
import { Url } from '../../models/url/index';


export interface IUrlServiceHttpClient {
    get(shortUrl: number, token: Token): Promise<Url>
    create(userToken: Token, longUrl: string, email: string, isPrivate: boolean): Promise<string>
}