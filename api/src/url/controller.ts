import { Request, Response } from "express";
import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";
import { Token } from "../../../shared/models/authenticate/index"
import { UrlService } from "./service";

export class UrlController { 

    urlService: UrlService;

    constructor(urlService: UrlService){
        this.urlService = urlService;
    }

    async Get(req: Request, res: Response): Promise<any> {

        var userToken: Token;
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
        console.log("Api-Module: user token: ", userToken);
        const shortUrl: number = parseInt(req.params.id);
        if (isNaN(shortUrl) && shortUrl > 0) {
            res.status(404).send("Short Url invalid");
        } else {
            try {
                const response = await this.urlService.Get(shortUrl, { ...userToken });
                if (String(response) == '403') {
                    res.status(403).send("Token invalid")
                } else {
                    console.log("Api-Module: resived response from Url-Service", response);
                    res.send(response);
                }
            } catch (ex) {
                res.status(500).send(`Api-Module: ${ex}`)
                console.log(`Api-Module: Fail to get url: ${ex}`);
            }
        }
    };
}