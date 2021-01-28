import { Request, Response } from "express"   
import * as query from "../databaseUrlQuery/queries"
import * as servsices from "../../../shared/modules/database/src/database.mysql/database.mysql.services/services"
  

export const post = async (req:Request, res:Response): Promise<void> => {  

    console.log("Url-Service-Module: reqest body: , ", req.body);
    const longUrl = req.body.LongUrl;
    const email = req.body.Email;
    const isPrivate: boolean = req.body.IsPrivate
    //first, cheak if the Long URL is already exist in the database.
    try{
        const IsExistUrlQuery: string = query.parseIsExistLongUrlQuery(longUrl);
        const isExist = await servsices.cheackIfUrlExsist(IsExistUrlQuery); 
        // TODO: if the Url is exist: check if it private,
        // "yes" -> (and it is not the current user url) create new url for the user.
        // "no"  -> return the short url that exist.  
        console.log("Url-Service-Module: Is Url exist :", isExist); 
            if(isExist){
                const getShortUrlQuery: string = query.parseGetUrlQuery(longUrl);
                try {
                    const shortUrl = await servsices.getShortUrl(getShortUrlQuery);
                    console.log("Url-Service-Module: Short url is already generate, try: " + JSON.stringify(shortUrl));
                    const shortUrlNumer = JSON.stringify(shortUrl).slice(13,-2);//[{"ShortURL":[the number]}]
                    res.status(200).send(shortUrlNumer);
                } catch(ex){
                    res.status(500).send(ex);
                }
            }
            else{
                const postLongUrlQuery: string = query.parseCreateUrlQuery(longUrl, email, isPrivate);
                console.log("Url-Service-Module ", postLongUrlQuery);
                try {
                    await servsices.addNewUrlToMysql(postLongUrlQuery)
                    console.log("Url-Service-Module: New Url is add to the db");
                    try{ 
                        const postLongUrlQuery: string = query.parseGetShortUrlQuery(longUrl);
                        const shortUrl = await servsices.getShortUrl(postLongUrlQuery);
                        console.log("Url-Service-Module: Short Url - " + JSON.stringify(shortUrl));
                        const shortUrlNumer = JSON.stringify(shortUrl).slice(13,-2);//[{"ShortURL":[the number]}]
                        res.status(200).send(shortUrlNumer);
                    } catch(ex){
                        res.status(500).send(ex);
                    }
                } catch(ex){
                    res.status(500).send(ex)
                }    
            }
    } catch (ex){
        res.status(500).send(ex)
    }
};

export const get = async (req:Request, res:Response): Promise<void> => {
    const shortUrlId = String(req.query.shortUrl); 
    console.log("Url-Service-Module: geting short url from Api number ", shortUrlId);    
    //check if the number is represent Long Url.
    const getShortUrlQuery: string = query.cheackIfShortUrlExsist(shortUrlId);
    console.log("Url-Service-Module: mySql query ", getShortUrlQuery);    
    const isExist = await servsices.cheackIfUrlExsist(getShortUrlQuery);
    console.log("Url-Service-Module: is exist url? ", isExist);    

        if(isExist){
            const getLongUrlQuery: string = query.parseGetLongUrlQuery(shortUrlId);
            console.log(getLongUrlQuery);
            try{
                const longUrl = await servsices.getLongUrl(getLongUrlQuery);
                console.log("Url-Service-Module longUrl: ", longUrl);
                res.send(longUrl);
            } catch(ex){
                res.send(ex);
            }
        }
        else{
            console.log("Short url does not found in the DB");
            res.send("Url-Service-Module Error, Url not fund");
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

