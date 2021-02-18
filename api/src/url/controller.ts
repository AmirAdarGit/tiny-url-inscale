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


    async post (req:Request, res:Response):Promise<void> {


        // TODO: cheak if i can just pass the reqest to url service as is.

        const userToken: Token = {
            value: req.headers.authorization.split(" ")[1]
        };

        const longUrl: string = req.body.longUrl;
        const email: string = req.body.Email;
        const isPrivate: boolean = Boolean(req.body.IsPrivate);
        try {
            const url = await this.urlService.post(userToken, longUrl, email, isPrivate);
            res.status(200).send(url);
        } catch (ex) {
            return new Promise ((res, rej) => {
                rej(ex)
            })
        }

        
        // const Usertoken: Token = {
        //     value: req.headers.authorization.split(" ")[1]
        // }
        // const reqEmail: string = req.body.Email   

        // try {
        //     //first steps, check the user token that attached to the header
        //     const response = await this.authHttpClient.UserValidetionToken(reqEmail, { ...Usertoken });
        //     console.log("Api-Module: response from Authenticate module validation token:", response);
        //     if (String(response) == 'Token error') {
        //         res.status(403).send('Token error')
        //     } else if (String(response) == 'Email error') {
        //         res.status(403).send('Email error')
        //     } else {
        //         //second step, send http request to Url-Service
        //         try {
        //             const url: Url = {
        //                 LongUrl : req.body.LongURL,
        //                 Email : req.body.Email,
        //                 IsPrivate : Boolean(req.body.IsPrivate)
        //             }
        //             const shortUrl = await this.urlHttpClient.Create(url);
        //             console.log(`Api-Module: new url - ${shortUrl}`);   
        //             res.status(200).send("Token verified, shortUrl - (number)/" + shortUrl);             
        //         } catch (ex) {
        //             console.log(`Api-Module: Failed create new short url: ${ex}`)
        //             res.status(500).send();
        //         }
        //     }
        // } catch (ex) {
        //     if (ex.response.status == 403) {
        //         console.log(`Api-Module: Failed create new short url: ${ex}`)
        //         res.status(403).send("invalid token");
        //     } else {
        //         res.status(500).send();
        //     }
        // }
    }


    async get(req: Request, res: Response): Promise<Url> {

        var userToken: Token;
        const shortUrl: number = parseInt(req.params.id);
        
        if (req.headers.authorization == undefined) {
            console.log("Api-Module: no token attached to the header.");
            userToken = {
                value: undefined
            }
        } else {
            userToken = {
                value: req.headers.authorization.split(" ")[1]
            }
        }  
        
        try {
            const url: Url = await this.urlService.get(shortUrl, { ...userToken });
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