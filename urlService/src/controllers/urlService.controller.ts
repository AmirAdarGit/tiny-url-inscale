import {Request, Response} from "express"   

import * as servsices from "../../../sheardModules/database/src/database.mysql/database.mysql.services/services"
  

export const post = async (req:Request, res:Response): Promise<void> => {  
    console.log("hereeee");

    const longUrl = req.body.newLink;
    const email = req.body.email;
    //cheakin if the Long URL is already in the database.
    await servsices.cheackIfLongUrlExsist(longUrl).then(isExist => {
        if(isExist){
            servsices.getShortUrlNumber(longUrl).then(shortNum => {
                console.log("Short url is already generate, num: " + JSON.stringify(shortNum));
                res.json(shortNum);
            })
        }
        else{
            console.log(longUrl);
            console.log(email);
            servsices.addNewUrlToMysql(longUrl, email).then(message => {
            console.log("add new Url " + message);
            });
            servsices.getShortUrlNumber(longUrl).then(shortNum => {
                console.log("the num" + JSON.stringify(shortNum));
                res.json(shortNum);
            })
            
        }
    })
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

