import { Request, Response } from "express";
import { Token } from "../../../shared/models/authenticate"
import { UrlService } from "./service";
import { tokenUtils } from "../../../shared/jwtToken/tokenUtils"
import { Url } from "../../../shared/models/url"

export class UrlController { 

    urlService: UrlService;

    constructor(urlService: UrlService){
        this.urlService = urlService;
    }

    async post (req:Request, res:Response):Promise<void> {

        const token: Token = tokenUtils.getToken(req.headers.authorization)
        const longUrl: string = req.body.longUrl;
        const email: string = req.body.email;
        const isPrivate: boolean = Boolean(req.body.isPrivate);
        const url: Url = new Url (longUrl, email, isPrivate);
        try {
            console.log(`[Api] - controller email: ${email}, longUrl:${longUrl}, isPrivate: ${isPrivate}`)
            console.log(`[Api] - controller token: ${token.value}`)

            const newUrl = await this.urlService.post(token, url);
            console.log(`[Api] - shortUrl: ${JSON.stringify(newUrl)}`);

            res.status(200).send(JSON.stringify(newUrl));
        } catch (ex) {
            res.status(500).send(ex);
        }
    }

    async get(req: Request, res: Response): Promise<void> {

        const shortUrl: number = parseInt(req.params.id);
        const token: Token = tokenUtils.getToken(req.headers.authorization)

        if (!shortUrl){
            res.status(400).send("Not Found, Short url is necessary in the params: id, for the 'get url' service.");
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