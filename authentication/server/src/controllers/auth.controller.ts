import {Request, Response} from "express"   
import * as jwt from "jsonwebtoken"
import endpoint from "../../../../shared/modules/enviromentVairble/src/endpoint.config";
import * as dotenv from 'dotenv'
dotenv.config() //use the jwt secet key 


    export const UserValidetionToken = async (req: Request, res: Response): Promise<void> => {

        console.log("Authenticate-module req.query: ", req.query)
        const Email: string = String(req.query.Email);
        const token: string = String(req.query.Token).slice(10, -2);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userEmail) => {// verify the user token with his one email
            if(err){
                res.status(403).send("Forbidden");
            }else{
                if (userEmail.email == Email){
                    res.status(200).send("Token verified");
                }
                else{
                    res.status(403).send("Forbidden");
                }
            }
        })
    }
    
    export const LinkValidetionToken = async (req: Request, res: Response): Promise<void> => {
        console.log("Authentication-Module - token:", req.query);
        const token: string = String(req.query.Value);
        console.log("Authentication-Module - token:", token);
        try{
            await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userEmail) => {// verify the user token with his one email
                if(err){
                console.log("Authentication-Module - err:", err);
                res.status(403).send("Forbidden");
                }else{
                console.log("Authentication-Module - user email:", userEmail.email);
                res.send(userEmail.email);
                }
            }) 
        } catch(err){
            res.send(err);
        }
    }

