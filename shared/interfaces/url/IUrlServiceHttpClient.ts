import { Token } from '../../models/authenticate';
import { Url } from '../../models/url';


export interface IUrlServiceHttpClient {
    get(shortUrl: number, token: Token): Promise<string>
    create(userToken: Token, url: Url): Promise<string>
}