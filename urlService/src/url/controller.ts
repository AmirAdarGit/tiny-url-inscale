import { Request, Response } from "express"   
import { Token } from "../../../shared/models/authenticate"
import { UrlService } from "./service"
import { tokenUtils } from "../../../shared/jwtToken/tokenUtils"
import { Url } from "../../../shared/models/url";

export class UrlController{

    urlService: UrlService;

    constructor(urlService: UrlService){
        this.urlService = urlService;
    }

    async post(req:Request, res:Response): Promise<void> {  
        console.log("[Url service]", req.body);
        const url: Url = req.body.urlInfo;
        const token: Token = tokenUtils.getToken(req.headers.authorization);
        console.log(`[Url service] - post - url: ${JSON.stringify(url)} token: ${token}`);
        try {
            const Shorturl: string = await this.urlService.create(token, url.longUrl, url.isPrivate); 
            if (Shorturl) {
                res.status(200).send(Shorturl);
            } else {
                res.status(403).send("Forbidden, cannot create new Url");
            }
        } catch (ex) {
                res.status(500).send(ex);
        }
    }

    async get(req:Request, res:Response): Promise<void> {
        console.log("Request data:");
        console.log(req.query.payload);

        // const shortUrl: string = String(req.headers);
        // const token: Token = new Token (String(req.query.token));
        // console.log(`[Url service] - shortUrl: ${shortUrl}`);
       const shortUrl = String(req.query.payload);
       const token: Token = new Token(null);
        try {
            const longUrl: string = await this.urlService.read(shortUrl, token);
            if (longUrl) {
                res.status(200).send(longUrl);
            }
            else {            
                res.status(404).send("Forbidden, cannot get Url");
            }
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
}