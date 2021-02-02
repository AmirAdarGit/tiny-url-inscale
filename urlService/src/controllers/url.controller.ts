import { Request, Response } from "express"   
import * as query from "../databaseUrlQuery/queries"
import * as servsices from "../../../shared/modules/database/src/database.mysql/database.mysql.services/services"
import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient"
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient";
import { Token } from "../../../shared/models/authenticate"
import { request } from "http"
export const post = async (req:Request, res:Response): Promise<void> => {  

    console.log("Url-Service-Module: reqest body: , ", req.body);
    const longUrl = req.body.LongUrl;
    const email = String(req.body.Email);
    const isPrivate: boolean = req.body.IsPrivate
    //first, cheak if the Long URL is already exist in the database.
    try{
        const IsExistUrlQuery: string = query.parseIsExistLongUrlQuery(longUrl);
        const linkInfo = await servsices.getLinkInfo(IsExistUrlQuery); 
        // TODO: if the Url is exist: check if it private,
        // "yes" -> (and it is not the current user url) create new url for the user.
        // "no"  -> return the short url that exist.  
 
        //new Link OR private exist link but not mine (the current user how ask for the service).
            if(linkInfo == 'not_Such_Link_On_DB' || (((linkInfo[0].Email) =! email) && Boolean(linkInfo[0].IsPrivate)))
            {
                const postLongUrlQuery: string = query.parseCreateUrlQuery(longUrl, email, isPrivate);
                console.log("Url-Service-Module ", postLongUrlQuery);
                try {
                    await servsices.addNewUrlToMysql(postLongUrlQuery)
                    console.log("Url-Service-Module: New Url is add to the db");
                    try{ 
                        const parseGetShortUrlQuery: string = query.parseGetShortUrlByUrlAndEmailQuery(longUrl, email);
                        const shortUrl = await servsices.getUrl(parseGetShortUrlQuery);
                        console.log("Url-Service-Module: Short Url - " + shortUrl[0].ShortURL);
                        // const shortUrlNumer = JSON.stringify(shortUrl).slice(13,-2);//[{"ShortURL":[the number]}]
                        res.status(200).send(String(shortUrl[0].ShortURL));
                    } catch(ex){
                        res.status(500).send(ex);
                    }
                } catch(ex){
                    res.status(500).send(ex)
                }    
            }
            else
            {
                try {
                    const parseGetShortUrlQuery: string = query.parseGetShortUrlByUrlAndEmailQuery(longUrl, email);
                    const shortUrl = await servsices.getUrl(parseGetShortUrlQuery);

                    console.log("Url-Service-Module ~~~~~~~~~~~~~~~~~", shortUrl);
                    console.log("Url-Service-Module: Short url is already generate, try: " + shortUrl[0].ShortURL);
                    // const shortUrlNumer = JSON.stringify(shortUrl).slice(13,-2);//[{"ShortURL":[the number]}]
                    res.status(200).send(String(shortUrl[0].ShortURL));
                } catch(ex){
                    res.status(500).send(ex);
                }
            }
    } catch (ex){
        res.status(500).send(ex)
    }
};

export const get = async (req:Request, res:Response): Promise<void> => {

    console.log("Url-Service body:", req.query);

    const httpClient: HttpClient = new HttpClient()// Post, Get
    const authServiceHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient(httpClient);

    const shortUrlId = String(req.query.shortUrl); 
    const token = String(req.query.Value);
    
    console.log("Url-Service-Module: geting short url from Api number ", shortUrlId);   
    console.log("Url-Service-Module: geting token from Api ", token);    
 
    //check if the number is represent Long Url.

    const getShortUrlQuery: string = query.cheackIfShortUrlExsist(shortUrlId);
    //check if the long url is private
    try{
        const linkInfo = await servsices.getLinkInfo(getShortUrlQuery);
        if(linkInfo == "not_Such_Link_On_DB"){
            res.send("not_Such_Link_On_DB");
            return;
        }
        console.log("Url-Service-Module: row:  ", linkInfo);  
        const isPrivate: boolean = linkInfo[0].IsPrivate;  
        const userEmail: string = linkInfo[0].Email;
        const longUrl: string = linkInfo[0].LongURL;
        console.log("Url-Service-Module: is private url? ", isPrivate);  
    
    //public URL
        if(!isPrivate){
            const getLongUrlQuery: string = query.parseGetLongUrlQuery(shortUrlId);
            try {
                // const longUrl = await servsices.getUrl(getLongUrlQuery);
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
                const response = await authServiceHttpClient.LinkValidetionToken(validToken);
                const emailFromToken = String(response);
                console.log("private URL Forword to authenticate token...", response);
                if(userEmail == emailFromToken){
                    res.send(longUrl);
                }
                res.send("Url link is not public, cannot access to " + shortUrlId);
            } catch(ex){
                res.send(ex);
            }
        }
    } catch(err){
        res.send(err);
    }
};

export const remove = async (req:Request, res:Response): Promise<void> => {
    const shotrUtl = req.query.ShortURL;
    console.log(shotrUtl); 
    servsices.removeShortUrlFromTable(`${shotrUtl}`);
    res.send("the user " + shotrUtl + " has been removed");
};


export const update = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"put"});
};

