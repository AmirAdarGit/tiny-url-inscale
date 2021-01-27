import { Request, Response } from "express"   
import { parseIsExistUrlQuery, parseGetUrlQuery, parseCreateUrlQuery} from "../databaseUrlQuery/queries"
import * as servsices from "../../../shared/modules/database/src/database.mysql/database.mysql.services/services"
  

export const post = async (req:Request, res:Response): Promise<void> => {  

    console.log("in url servise module, ", req.body);
    const longUrl = req.body.LongUrl;
    const email = req.body.Email;
    const isPrivate: boolean = req.body.IsPrivate
    //first, cheak if the Long URL is already in the database.
    try{
        const IsExistUrlQuery: string = parseIsExistUrlQuery(longUrl);
        const isExist = await servsices.cheackIfLongUrlExsist(IsExistUrlQuery);
        console.log("In url servise module, is Exist Log:", isExist);
            if(isExist){
                const getShortUrlQuery: string = parseGetUrlQuery(longUrl);
                try {
                    const shortUrl = await servsices.getShortUrlNumber(getShortUrlQuery);
                    console.log("Short url is already generate, try: " + JSON.stringify(shortUrl));
                    res.status(200).json(shortUrl);
                } catch(ex){
                    res.status(500).send(ex);
                }
            }
            else{
                const postLongUrlQuery: string = parseCreateUrlQuery(longUrl, email, isPrivate);
                console.log(postLongUrlQuery);
                try {
                    await servsices.addNewUrlToMysql(postLongUrlQuery)
                    console.log("New url is add to the db");
                    try{ 
                        const shortUrl = await servsices.getShortUrlNumber(longUrl);
                        console.log("Short Url: " + JSON.stringify(shortUrl));
                        res.status(200).json(shortUrl);
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

