import {Request, Response} from "express"   

import * as servsices from "../../../database/src/database.mysql/datacase.mysql.services/services"


export const post = async (req:Request, res:Response): Promise<void> => {
    const longUrl = req.body.LongURL;
    const shortUrl = req.body.ShortURL;
    const email = req.body.Email;
    servsices.addNewUrlToMysql(longUrl, shortUrl, email);
    // const ans = JSON.stringify(req.body);
    res.send("Success");
};


export const get = async (req:Request, res:Response): Promise<void> => {
    const shotrUtl = req.query.ShortURL;
    console.log("The user looking for the original (long) url of ", shotrUtl);
    const ans = await servsices.getUrlInfo(`${shotrUtl}`);
    //ans = true if find the property in the DB
    //ans = false otherwise
    //TODO: ask Carmel why i cannot catch if there is not short url at the DB. 
    if(ans == false) 
    {
        res.send("error, short URL doesnt found in the database!");
    }
    else
    { 
        res.send("Success");
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

