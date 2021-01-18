import {Request, Response} from "express"   
import * as express from "express"
import * as jwt from "jsonwebtoken"
import axios from 'axios'
import { userInfo } from "os";


interface IUserRequest extends express.Request {
    auth: any
}
  
export const post = async (req:IUserRequest, res:Response): Promise<void> => {
    console.log("here!!!!");
    
    // const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    //    const newUser = {
//     Email : req.body.Email,
//     longUrlLink : req.body.LongURL,
// }
// console.log(newUser);
// console.log("after!!!");

// await axios.post('http://localhost:8070/api/url', newUser).then((ans) => {
//     console.log(ans.data);
//     res.status(201).send("Success");
// }).catch((err) => {
//     console.log(err);
//     res.status(500).send("Internal Server Error");
// })

};



export const authenticateToken = async (req:Request, res:Response):Promise<void> => {
    const header = req.body;
    const authHeader = header.header.authorization.split(" ");
    const token = authHeader && authHeader[1]; //if the auth header is there... take the second argument.
    if(token == null) {
        res.status(401).send("Unauthorized");
            res.send(false);
    }
    else{
        try{
        const ans = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
        res.send(true);
        }
        catch{
            console.log("err");
            res.send(false);
        } 
    }
    //     //{ //verify the token, return callbeck//
    //         // if(err){
    //         //     return new Promise ((ans) => {
    //         //         ans(false);
    //         //     })
    //         // }else{
    //             // console.log(userEmail);
    //             // req.auth = userEmail;// adding to the request the user email for future actions from the DB
    //             // return true;
    //     //         return new Promise ((ans) => {
    //     //             ans(true);
    //     //         })
    //     //     }
    //     // });
    // }
}

