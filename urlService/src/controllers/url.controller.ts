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
        const IsExistUrlQuery: string = query.parseIsExistUrlQuery(longUrl);
        const isExist = await servsices.cheackIfLongUrlExsist(IsExistUrlQuery); 
        // TODO: if the Url is exist: check if it private,
        // "yes" -> (and it is not the current user url) create new url for the user.
        // "no"  -> return the short url that exist.  
        console.log("Url-Service-Module: Is Url exist :", isExist); 
            if(isExist){
                const getShortUrlQuery: string = query.parseGetUrlQuery(longUrl);
                try {
                    const shortUrl = await servsices.getShortUrlNumber(getShortUrlQuery);
                    console.log("Url-Service-Module: Short url is already generate, try: " + JSON.stringify(shortUrl));
                    const shortUrlNumer = JSON.stringify(shortUrl).slice(13,-2);//[{"ShortURL":[the number]}]
                    res.status(200).send(shortUrlNumer);
                } catch(ex){
                    res.status(500).send(ex);
                }
            }
            else{
                const postLongUrlQuery: string = query.parseCreateUrlQuery(longUrl, email, isPrivate);
                try {
                    await servsices.addNewUrlToMysql(postLongUrlQuery)
                    console.log("Url-Service-Module: New Url is add to the db");
                    try{ 
                        const postLongUrlQuery: string = query.parseGetShortUrlQuery(longUrl);
                        const shortUrl = await servsices.getShortUrlNumber(postLongUrlQuery);
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
    const shortUrlId = req.params.shortUrl;     
    console.log("heree" + shortUrlId);
    await servsices.cheackIfShortUrlExsist(shortUrlId).then(isExist => {//first cheack if the shortURL is exsist in the DB
        if(isExist){
            const ans =  servsices.getUrlInfo(`${shortUrlId}`).then(ans => { //return the Long url from the BD.
                res.send("Success\n " + ans);
                console.log("Success");
            })
        }
        else{
            res.send("Short url does not exist");
            console.log("Short url does not found in the DB");

        }
    })
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

