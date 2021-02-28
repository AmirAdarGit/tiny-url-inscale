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

        const token: Token = tokenUtils.getToken(req.headers.authorization)
        const longUrl: string = req.body.longUrl;
        const email: string = req.body.Email;
        const isPrivate: boolean = Boolean(req.body.IsPrivate);

        try {
            const url = await this.urlService.post(token, longUrl, email, isPrivate);
            res.status(200).send(url);
        } catch (ex) {
            res.status(500).send(ex);
        }
    }

    async get(req: Request, res: Response): Promise<void> {

        const shortUrl: number = parseInt(req.params.id);
        const token: Token = tokenUtils.getToken(req.headers.authorization)

        if (!shortUrl){
            res.status(404).send("Not Found, Short url is necessary in the params: id, for the 'get url' service.");
            return;
        }
        try {
            const url: string = await this.urlService.get(shortUrl, token);
            res.status(200).send(url);
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
}