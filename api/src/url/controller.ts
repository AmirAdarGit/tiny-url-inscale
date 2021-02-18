import { Request, Response } from "express";
import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";
import { Token } from "../../../shared/models/authenticate/index"
import { Url } from "../../../shared/models/url";
import { UrlService } from "./service";

export class UrlController { 

    urlService: UrlService;

    constructor(urlService: UrlService){
        this.urlService = urlService;
    }

    async Get(req: Request, res: Response): Promise<Url> {

        var userToken: Token;
        const shortUrl: number = parseInt(req.params.id);
        
        if (req.headers.authorization == undefined) {
            console.log("Api-Module: no token attached to the header.");
            userToken = {
                Value: undefined
            }
        } else {
            userToken = {
                Value: req.headers.authorization.split(" ")[1]
            }
        }  
        
        try {
            const url: Url = await this.urlService.Get(shortUrl, { ...userToken });
            console.log(`Api-Module: success to get the longUrl: ${url}, from the short url: ${shortUrl}`);
            return new Promise ((res, rej) => {
                return res(url);
            })
        } catch (ex) {
            res.status(500).send(`Api-Module: ${ex}`)
            console.log(`Api-Module: Fail to get url: ${ex}`);
        }
    }
}