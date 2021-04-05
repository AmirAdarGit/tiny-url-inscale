import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";
import { Token } from "../../../shared/models/authenticate/index"
import { Url } from "../../../shared/models/url";

export class UrlService { 

    urlHttpClient: IUrlServiceHttpClient;
    
    constructor(urlServiceHttpClient: IUrlServiceHttpClient){
        this.urlHttpClient = urlServiceHttpClient;
    }

    async post(userToken: Token, url: Url) {
        console.log(`[Api] post UrlService class, token: ${userToken} url: ${JSON.stringify(url)}`)
        return await this.urlHttpClient.create(userToken, url);
    }

    async get(shortUrl: number, userToken: Token): Promise<string> {
        return await this.urlHttpClient.get(shortUrl, { ...userToken });    
    }
}
