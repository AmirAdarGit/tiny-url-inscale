import { Token } from '../../models/authenticate';
import { Url } from '../../models/url/index';


export interface IUrlServiceHttpClient {
    Get(shortUrl: number, token: Token): Promise<Url>
    Create(url: Url): Promise<void>
}