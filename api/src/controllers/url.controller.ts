import axios from "axios";
import { Request, Response } from "express";
import { isThisTypeNode } from "typescript";
import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";
import { UrlServiceHttpClient } from "../../../shared/modules/urlServiceHttpClient/client";


export class UrlController { 

    urlHttpClient: IUrlServiceHttpClient;

    constructor(urlServiceHttpClient: IUrlServiceHttpClient){
        this.urlHttpClient = urlServiceHttpClient;
    }

    async Get(req: Request, res: Response): Promise<any> {
        const shortUrl = parseInt(req.params.id);
        if(isNaN(shortUrl) && shortUrl > 0){
            res.status(404).send("Short Url invalid");
        }
        else{
            try {
                const response = await this.urlHttpClient.Get(shortUrl);
                console.log("Api-Module: resived response from Url-Service", response);
                //if the response statuse == 200,401,404 return respectively
                res.send(response);
            } catch(ex) {
                res.status(500).send(`Api-Module: ${ex}`)
                console.log(`Api-Module: ${ex}`);
            }

        }
    };

    async Post(req: Request, res: Response): Promise<void> {
    
    };
    
    
    async Update(req: Request, res: Response): Promise<void> {
    
    };

    async Remove(req: Request, res: Response): Promise<void> {
    
    };
}