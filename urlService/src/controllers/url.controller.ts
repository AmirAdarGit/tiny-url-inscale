import { Request, Response } from "express"   
import * as query from "../databaseUrlQuery/queries"
import * as servsices from "../../../shared/modules/database/src/database.mysql/database.mysql.services/services"
import { Token } from "../../../shared/models/authenticate"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient"
export class UrlController {

    authHttpClient: IAuthServiceHttpClient;

    constructor(urlServiceHttpClient: IAuthServiceHttpClient){
        this.authHttpClient = urlServiceHttpClient;
    }

    async Post(req:Request, res:Response): Promise<void> {  
    
        console.log("Url-Service-Module: reqest body: , ", req.body);
        const reqLongUrl: string = req.body.LongUrl;
        const reqEemail: string = req.body.Email;
        const reqIsPrivate: boolean = req.body.IsPrivate
        try{
            //cheak if the URL is already exist in the database.
            const urlPropertiesQuery: string = query.parseGetUrlPropertiesQuery(reqLongUrl);
            const resLinkProperties: any = await servsices.getLinkInfo(urlPropertiesQuery); 
            
            //if  new Link -OR- private exist link -AND- not mine (the current user how ask for the service).
            //- the link is public, dont create.
            //- the link is mine (private but the current user already created by the current user), dont create.
                
            if(resLinkProperties == 'not_Such_Link_On_DB' || ((resLinkProperties[0].IsPrivate) && ((resLinkProperties[0].Email) =! reqEemail))){
                try {
                    const createUrlQuery: string = query.parseCreateUrlQuery(reqLongUrl, reqEemail, reqIsPrivate);
                    await servsices.addNewUrlToMysql(createUrlQuery)
                    console.log("Url-Service-Module: New Url has been added to the db");
                    try{ 
                        // resive the new short Url wich just created above, reqEmail require because duplicate private links.
                        const getShortUrlByUrlAndEmailQuery: string = query.parseGetShortUrlByUrlAndEmailQuery(reqLongUrl, reqEemail);
                        const shortUrl:any = await servsices.getUrl(getShortUrlByUrlAndEmailQuery);
                        console.log("Url-Service-Module: Short Url - " + shortUrl[0].ShortURL);
                        res.status(200).send(String(shortUrl[0].ShortURL));
                    } catch(ex){
                        res.status(500).send(ex);
                    }
                } catch(ex){
                    res.status(500).send(ex)
                }    
            }
            else{
            //Url is already created
                try {
                    console.log("Url-Service-Module: Short url is already generate, try: " + resLinkProperties[0].ShortURL);
                    res.status(200).send(String(resLinkProperties[0].ShortURL));
                } catch(ex){
                    res.status(500).send(ex);
                }
            }
        } catch (ex){
            res.status(500).send(ex)
        }
    };
    

    async Get(req:Request, res:Response): Promise<void> {
        const shortUrlId = String(req.query.shortUrl); 
        const token = String(req.query.Value);
        console.log("Url-Service-Module: geting short url from Api number ", shortUrlId);   
        console.log("Url-Service-Module: geting token from Api ", token);    
    
        //check if the number is represent Long Url.
    
        const getShortUrlQuery: string = query.cheackIfShortUrlExsist(shortUrlId);
        //check if the long url is private
        try{
            const linkInfo:any = await servsices.getLinkInfo(getShortUrlQuery);
            if(linkInfo == "not_Such_Link_On_DB"){
                res.send("not_Such_Link_On_DB");
                return;
            }
            console.log("Url-Service-Module: row:  ", linkInfo); 
            const longUrl: string = linkInfo[0].LongURL;
            const userEmail: string = linkInfo[0].Email;
            const isPrivate: boolean = linkInfo[0].IsPrivate;  
            
            console.log("Url-Service-Module: is private url? ", isPrivate);  
        
        //public URL
            if(!isPrivate){
                try {
                    console.log("Url-Service-Module longUrl: ", longUrl);
                    res.send(longUrl);
                } catch(ex){
                res.send(ex);
                }
            }
        //private URL
            else{
                if(token == 'undefined'){//means that no token attachet to the http get request.
                    res.send("Url link is not public, Token needed. \nthe Token shuld be attached to the header");
                    return;
                }
                try{
                    const validToken: Token = {
                        Value: token
                    }
                    console.log("private URL forword to Authenticate Service, sending the token: ", validToken);
                    const response = await this.authHttpClient.LinkValidetionToken(validToken);
                    const emailFromToken = String(response);
                    if(userEmail == emailFromToken){
                        res.send(longUrl);
                    }
                    else {
                        res.send("Url link is not public, cannot access to " + shortUrlId);
                    }
                } catch(ex){
                    res.send(ex);
                }
            }
        } catch(err){
            res.send(err);
        }
    };
    
    async Remove(req:Request, res:Response): Promise<void> {
        const shotrUtl = req.query.ShortURL;
        console.log(shotrUtl); 
        servsices.removeShortUrlFromTable(`${shotrUtl}`);
        res.send("the user " + shotrUtl + " has been removed");
    };
    
    async Update(req:Request, res:Response): Promise<void> {
        res.send({user:"amiraaaaaa",
        method:"put"});
    };

}