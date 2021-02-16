import { Request, Response } from "express";
import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";
import { Token } from "../../../shared/models/authenticate/index"

export class UrlService { 

    urlHttpClient: IUrlServiceHttpClient;

    constructor(urlServiceHttpClient: IUrlServiceHttpClient){
        this.urlHttpClient = urlServiceHttpClient;
    }

    async Get(shortUrl: number, userToken: Token): Promise<any> {
        return await this.urlHttpClient.Get(shortUrl, { ...userToken });    
    }
}
