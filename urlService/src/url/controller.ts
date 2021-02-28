import { Request, Response } from "express"   
import { Token } from "../../../shared/models/authenticate"
import { UrlService } from "./service"
import { tokenUtils } from "../../../shared/jwtToken/tokenUtils"

export class UrlController{

    urlService: UrlService;

    constructor(urlService: UrlService){
        this.urlService = urlService;
    }

    async post(req:Request, res:Response): Promise<void> {  
    
        const reqLongUrl: string = req.body.LongUrl;
        const reqIsPrivate: string = String(req.body.IsPrivate);
        const token: Token = tokenUtils.getToken(req.headers.authorization);
        
        try {
            const Shorturl: string = await this.urlService.create(token, reqLongUrl, reqIsPrivate); 
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

        const shortUrl: string = String(req.body.shortUrl);
        const token: Token = req.body.token;
       
        try {
            const longUrl: string = await this.urlService.read(shortUrl, token);
            if (longUrl) {
                res.status(200).send(longUrl);
            }
            else {            
                res.status(403).send("Forbidden, cannot get Url");
            }
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
}