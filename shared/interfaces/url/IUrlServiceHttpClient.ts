import { Url } from '../../models/url/index';


export interface IUrlServiceHttpClient {
    //Get(email: string): Promise<User>
    Create(url: Url): Promise<void>
}