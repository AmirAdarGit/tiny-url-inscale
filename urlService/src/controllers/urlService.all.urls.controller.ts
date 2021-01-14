import {Request, Response} from "express"   
import * as express from "express"

import * as servsices from "../../../database/src/database.mysql/database.mysql.services/services"
import { couldStartTrivia } from "typescript";
  


interface IUserRequest extends express.Request {
    authorization: any
}
  
export const get = async (req:IUserRequest, res:Response): Promise<void> => {
    console.log(req.query);
    const { name : email } = req.query;
    // const { name } = auth;
    // console.log(email);
    // console.log("after in url");
    await servsices.getAllUserUrls(email).then((urlList) => {
        // console.log(urlList);
        res.json(urlList);
    })
};
