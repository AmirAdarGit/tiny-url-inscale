import { Token } from '../../models/authenticate';
import { Url } from '../../models/url/index';


export interface IUrlServiceHttpClient {
    Get(shortUrl: number, token: Token): Promise<void>
    Create(url: Url): Promise<void>
}