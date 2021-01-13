import {Request, Response} from "express"   
import * as express from "express"
import * as jwt from "jsonwebtoken"
import * as connector from "../../../database/src/database.mysql/database.mysql.services/services"

interface IUserRequest extends express.Request {
    Email: any
}
  


export const get = async (req:IUserRequest, res:Response): Promise<void> => {
    const list = await connector.getAllUserUrls(req.Email).then((urlList) => {
        // console.log(urlList);
        res.json(urlList);
    })
};



export const authenticateToken = (req:IUserRequest, res:Response, next:any):void => {
    console.log("hereeeeee");
    const authHeader = req.headers['authorization'].split(" ");
    const token = authHeader && authHeader[1];
    if(token == null) {
        res.status(401).send("Unauthorized")
    }
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userEmail) => { //callbeck//
            if(err){
                return res.status(403).send("Forbidden");
            }else{
                req.Email = userEmail;
                next();
                }
            })
        
    }
}

