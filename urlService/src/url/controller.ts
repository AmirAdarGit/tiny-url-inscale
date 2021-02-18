import { Request, Response } from "express"   
import { Token } from "../../../shared/models/authenticate"
import { UrlProducer } from "../produce.url.sqs/produce"
import { UrlService } from "./service"
import * as query from "../databaseUrlQuery/queries"
import * as mysql from 'mysql'

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
            res.send(ex)
        }
        //     //cheak if the URL is already exist in the database.
        //     const urlPropertiesQuery: string = query.parseGetUrlPropertiesQuery(reqLongUrl);
        //     const resLinkProperties: mysql.RowDataPacket = await this.urlService.Execute<mysql.RowDataPacket>(urlPropertiesQuery); 

        //     //if  new Link -OR- private exist link -AND- not mine (the current user how ask for the service).
        //     //- the link is public, dont create.
        //     //- the link is mine (private but the current user already created by the current user), dont create.
                
        //     // TO DO: check resLinkProperties[0] == '' 
        //     if (resLinkProperties[0] == '' || ((resLinkProperties[0].IsPrivate) && ((resLinkProperties[0].Email) =! reqEmail))) {
        //         try {
        //             const createUrlQuery: string = query.parseCreateUrlQuery(reqLongUrl, reqEmail, reqIsPrivate);
        //             await this.urlService.Execute<mysql.OkPacket>(createUrlQuery);
        //             console.log("Url-Service-Module: New Url has been added to the db");
        //             try { 
        //                 // resive the new short Url wich just created above, reqEmail require because duplicate private links.
        //                 const getShortUrlByUrlAndEmailQuery: string = query.parseGetShortUrlByUrlAndEmailQuery(reqLongUrl, reqEmail);
        //                 const shortUrl: mysql.RowDataPacket = await this.urlService.Execute<mysql.RowDataPacket>(getShortUrlByUrlAndEmailQuery);
        //                 console.log("Url-Service-Module: Short Url - " + shortUrl[0].ShortURL);
        //                 //sqs consumer
        //                 await this.urlService.urlProducer.ProduceShortUrl(reqEmail ,String(shortUrl[0].ShortURL), String(reqLongUrl));
        //                 res.status(200).send(String(shortUrl[0].ShortURL));
        //             } catch (ex){
        //                 console.log(`Url-Servise-Module: Error, ${ex}`)
        //                 res.status(500).send(ex);
        //             }
        //         } catch(ex) {
        //             console.log(`Url-Servise-Module: Error, ${ex}`)
        //             res.status(500).send(ex)
        //         }    
        //     } else {
        //     //Url is already created
        //         try {
        //             console.log("Url-Service-Module: Short url is already generate, try: " + resLinkProperties[0].ShortURL);
        //             res.status(200).send(String(resLinkProperties[0].ShortURL));
        //         } catch(ex){
        //             res.status(500).send(ex);
        //         }
        //     }
        // } catch (ex) {
        //     console.log(`Url-Servise-Module: Error, ${ex}`)
        //     res.status(500).send(ex)
        // }
    };
    

    // async Get(req:Request, res:Response): Promise<void> {
    //     const shortUrlId = String(req.query.shortUrl); 
    //     const token = String(req.query.Value);
    //     console.log("Url-Service-Module: geting short url from Api number ", shortUrlId);   
    //     console.log("Url-Service-Module: geting token from Api ", token);    
    
    //     //check if the number is represent Long Url.
    //     //check if the long url is private
    //     try {
    //         const getShortUrlQuery: string = query.cheackIfShortUrlExsist(shortUrlId);
    //         const linkInfo: mysql.RowDataPacket = await this.urlService.Execute(getShortUrlQuery);
    //         if (linkInfo[0] == '') {
    //             res.send("not_Such_ Link_On_DB");
    //             return;
    //         }
    //         console.log("Url-Service-Module: row:  ", linkInfo); 
    //         const longUrl: string = linkInfo[0].LongURL;
    //         const userEmail: string = linkInfo[0].Email;
    //         const isPrivate: boolean = linkInfo[0].IsPrivate;  
    //         console.log("Url-Service-Module: is private url? ", isPrivate);  
        
    //     //public URL
    //         if (!isPrivate) {
    //             try {
    //                 console.log("Url-Service-Module longUrl: ", longUrl);
    //                 res.send(longUrl);
    //             } catch(ex) {
    //                 res.send(ex);
    //                 console.log(`Url-Servise-Module: Error, ${ex}`)
    //             }
    //     //private URL
    //         } else {
    //             if (token == 'undefined') {//means that no token attachet to the http get request.
    //                 res.send("Url link is not public, Token needed. \nthe Token shuld be attached to the header");
    //                 return;
    //             }
    //             try {
    //                 const validToken: Token = {
    //                     Value: token
    //                 }
    //                 console.log("private URL forword to Authenticate Service, sending the token: ", validToken);
    //                 const response = await this.urlService.LinkValidetionToken(validToken);
    //                 const emailFromToken = String(response);
    //                 if (emailFromToken == '403') {
    //                     res.send("403");
    //                 } else if (userEmail == emailFromToken) {
    //                     res.send(longUrl);
    //                 } else {
    //                     res.send("Url link is not public, cannot access to " + shortUrlId);
    //                 }
    //             } catch(ex) {
    //                 console.log(`Url-Servise-Module: Error, ${ex}`)
    //                 res.send(ex);
    //             }
    //         }
    //     } catch(ex) {
    //         console.log(`Url-Servise-Module: Error, ${ex}`)
    //         res.send(ex);
    //     }
    // };
}