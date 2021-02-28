import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";
import { Token } from "../../../shared/models/authenticate/index"

export class UrlService { 

    urlHttpClient: IUrlServiceHttpClient;
    
    constructor(urlServiceHttpClient: IUrlServiceHttpClient){
        this.urlHttpClient = urlServiceHttpClient;
    }

    async post(userToken: Token, longUrl: string, email: string, isPrivate: boolean) {
        return await this.urlHttpClient.create(userToken, longUrl, email, isPrivate)
    }

    async get(shortUrl: number, userToken: Token): Promise<string> {
        return await this.urlHttpClient.get(shortUrl, { ...userToken });    
    }
}
