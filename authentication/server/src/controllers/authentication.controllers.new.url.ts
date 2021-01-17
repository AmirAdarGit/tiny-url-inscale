import {Request, Response} from "express"   
import * as express from "express"
import * as jwt from "jsonwebtoken"
import axios from 'axios'


interface IUserRequest extends express.Request {
    auth: any
}
  
export const post = async (req:IUserRequest, res:Response): Promise<void> => {
   const newUser = {
    Email : req.body.Email,
    longUrlLink : req.body.LongURL,
}
console.log(newUser);
console.log("after!!!");

await axios.post('http://localhost:8070/api/url', newUser).then((ans) => {
    console.log(ans.data);
    res.status(201).send("Success");
}).catch((err) => {
    console.log(err);
    res.status(500).send("Internal Server Error");
})

};



export const authenticateToken = (req:IUserRequest, res:Response, next:any):void => {
    const authHeader = req.headers['authorization'].split(" ");
    const token = authHeader && authHeader[1]; //if the auth header is there... take the second argument.
    if(token == null) {
        res.status(401).send("Unauthorized")
    }
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userEmail) => { //verify the token, return callbeck//
            if(err){
                return res.status(403).send("Forbidden");
            }else{
                req.auth = userEmail;// adding to the request the user email for future actions from the DB
                next();
                }
            })
        
    }
}

