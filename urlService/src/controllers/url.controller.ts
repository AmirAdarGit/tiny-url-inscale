import {Request, Response} from "express"   

import * as connector from "../../../database/src/database.mysql/database.mysql.connection/connection"
import * as servsices from "../../../database/src/database.mysql/datacase.mysql.services/services"


export const post = async (req:Request, res:Response): Promise<void> => {
    const longUrl = req.body.LongURL;
    const shortUrl = req.body.ShortURL;
    const email = req.body.Email;
    res.send(req.body);
    servsices.addNewUrlToMysql(longUrl, shortUrl, email);
};



export const get = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"get"});
};
export const update = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"put"});
};
export const remove = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"delete"});
};
