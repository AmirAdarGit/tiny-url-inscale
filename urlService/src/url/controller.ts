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
        const reqIsPrivate: string = String(req.body.IsPrivate)

        const token: string = tokenUtils.getToken(req.headers.authorization)
        const userToken: Token = new Token(token)
        // ToDo: fatch the token from the header 
        
        try {
            const Shorturl: string = await this.urlService.create(userToken, reqLongUrl, reqIsPrivate); 
            if (Shorturl) {
                res.status(200).send(Shorturl)
        }
            else { return new Promise((res, rej) => { rej(`Cannot create new short Url from ${reqLongUrl}`)})}
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
                res.status(200).send(longUrl) 
            }
            else { return new Promise ((res, rej) => { rej(`Cannot get the url of ${shortUrl}`)})}
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
}