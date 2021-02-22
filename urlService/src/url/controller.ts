import { Request, Response } from "express"   
import { Token } from "../../../shared/models/authenticate"
import { UrlService } from "./service"

export class UrlController{

    urlService: UrlService;

    constructor(urlService: UrlService){
        this.urlService = urlService;
    }

    async post(req:Request, res:Response): Promise<void> {  
    
        console.log("Url-Service-Module: reqest body: , ", req.body);
        const reqLongUrl: string = req.body.LongUrl;
        const reqIsPrivate: string = String(req.body.IsPrivate)
        const token: Token = new Token(req.headers.authorization.split(" ")[1])
        // ToDo: fatch the token from the header 
        
        try {
            const url: String = await this.urlService.create(token, reqLongUrl, reqIsPrivate); 
            res.status(200).send(url);
        } catch (ex) {
            res.send(ex);
        }
    };


    async get(req:Request, res:Response): Promise<void> {

        const shortUrl: string = String(req.body.shortUrl);
        const token: Token = req.body.token;
       
        try {
        const longUrl: string = await this.urlService.read(shortUrl, token);
        res.status(200).send(longUrl);
        } catch (ex) {
            res.send(ex);
        }
    }



}