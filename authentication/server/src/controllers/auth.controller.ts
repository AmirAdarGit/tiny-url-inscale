import {Request, Response} from "express"   
import * as jwt from "jsonwebtoken"


    export const UserValidetionToken = async (req: Request, res: Response): Promise<void> => {

        console.log("Authenticate-module req.query: ", req.query)
        const Email: string = String(req.query.email);
        const token: string = String(req.query.Value);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, userEmail: any) => {// verify the user token with his one email
            if (err) {
                res.send("Token error");
            } else {
                if (Email == userEmail.email) {
                    res.status(200).send("Token verified");
                }
                else {
                    res.send("Email error");
                }
            }
        })
    }
    
    export const LinkValidetionToken = async (req: Request, res: Response): Promise<void> => {
        const token: string = String(req.query.Value);
        console.log("Authentication-Module - token:", token);
        try {
            await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userEmail:any) => {// verify the user token with his one email
                if (err) {
                    console.log(`Authentication-Module - err:, ${err}`);
                    res.send("403");
                } else { 
                    console.log("Authentication-Module - user email:", userEmail.email);
                    res.send(userEmail.email);
                }
            }) 
        } catch(ex) { 
            console.log(`Authentication-Module - err:, ${ex}`);
            res.send(ex);
        }
    }

