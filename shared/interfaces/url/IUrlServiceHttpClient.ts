import { Url } from '../../models/url/index';


export interface IUrlServiceHttpClient {
    Get(shortUrl: number): Promise<void>
    Create(url: Url): Promise<void>
}