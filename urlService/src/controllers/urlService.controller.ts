import {Request, response, Response} from "express"   
import { isCallChain } from "typescript";

import * as servsices from "../../../database/src/database.mysql/datacase.mysql.services/services"
  

export const post = async (req:Request, res:Response): Promise<void> => {   
    const longUrl = req.body.LongURL;
    const email = req.body.Email;

    //cheakin if the Long URL is already in the database.
    await servsices.cheackIfLongUrlExsist(longUrl).then(isExist => {
        if(isExist){
            res.send("Url is alredy exist");
            console.log("Url is alredy exist")
        }
        else{
            servsices.addNewUrlToMysql(longUrl, email);
            res.send("Success")
            console.log("add new user")
        }
    })
};

export const get = async (req:Request, res:Response): Promise<void> => {
    const shortUrlId = req.params.id;     
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

