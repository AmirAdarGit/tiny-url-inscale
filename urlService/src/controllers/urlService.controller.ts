import {Request, Response} from "express"   

import * as servsices from "../../../database/src/database.mysql/datacase.mysql.services/services"


export const post = async (req:Request, res:Response): Promise<void> => {
    const longUrl = req.body.LongURL;
    const shortUrl = req.body.ShortURL;
    const email = req.body.Email;
    res.send(req.body);
    servsices.addNewUrlToMysql(longUrl, shortUrl, email);
};


export const get = async (req:Request, res:Response): Promise<void> => {
    const shotrUtl = req.query.ShortURL;
    console.log("short url from the http request:", shotrUtl);
    servsices.getUrlInfo(`${shotrUtl}`);
    res.send("Getting the LongUrl...");
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

