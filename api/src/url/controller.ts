import { Request, Response } from "express";
import { Token } from "../../../shared/models/authenticate"
import { UrlService } from "./service";
import { tokenUtils } from "../../../shared/jwtToken/tokenUtils"


export class UrlController { 

    urlService: UrlService;

    constructor(urlService: UrlService){
        this.urlService = urlService;
    }


    async post (req:Request, res:Response):Promise<void> {


        // TODO: cheak if i can just pass the reqest to url service as is.
        const token: string = tokenUtils.getToken(req.headers.authorization)

        const userToken: Token = {
            value: token
        };

        const longUrl: string = req.body.longUrl;
        const email: string = req.body.Email;
        const isPrivate: boolean = Boolean(req.body.IsPrivate);
        try {
            const url = await this.urlService.post(userToken, longUrl, email, isPrivate);
            res.status(200).send(url);
        } catch (ex) {
            res.status(500).send(ex);
        }
    }


    async get(req: Request, res: Response): Promise<void> {

        var userToken: Token;
        const shortUrl: number = parseInt(req.params.id);

        if (!shortUrl){
            res.status(500).send("Short url is necessary in the params: id, for the 'get url' service.");
            return;
        }

        if (req.headers.authorization == undefined) {
            console.log("Api-Module: no token attached to the header.");
            userToken = null;
        } else {
            const token: string = tokenUtils.getToken(req.headers.authorization)
            userToken = new Token (token);
        }  
        
        try {
            const url: string = await this.urlService.get(shortUrl, userToken);
            console.log(`Api-Module: success to get the longUrl: ${url}, from the short url: ${shortUrl}`);
            res.status(200).send(url);
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
}