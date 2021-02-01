import axios from "axios";
import { Request, Response } from "express";
import { isThisTypeNode } from "typescript";
import { IUrlServiceHttpClient } from "../../../shared/interfaces/url/IUrlServiceHttpClient";
import { UrlServiceHttpClient } from "../../../shared/modules/urlServiceHttpClient/client";
import { Token } from "../../../shared/models/authenticate/index"
import { userInfo } from "os";


export class UrlController { 

    urlHttpClient: IUrlServiceHttpClient;

    constructor(urlServiceHttpClient: IUrlServiceHttpClient){
        this.urlHttpClient = urlServiceHttpClient;
    }

    async Get(req: Request, res: Response): Promise<any> {

        var userToken: Token;
        if(req.headers.authorization == undefined){
            console.log("Api-Module: no token touch to the header");
            userToken = {
                Value: undefined
            }
        }
        else {
            userToken = {
                Value: req.headers.authorization.split(" ")[1]
            }
        }  
        console.log("Api-Module: user token: ", userToken);
        const shortUrl = parseInt(req.params.id);
        if(isNaN(shortUrl) && shortUrl > 0){
            res.status(404).send("Short Url invalid");
        }
        else{
            try {
                const response = await this.urlHttpClient.Get(shortUrl, { ...userToken });
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