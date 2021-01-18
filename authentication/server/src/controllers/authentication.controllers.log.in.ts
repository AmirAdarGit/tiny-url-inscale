import {Request, Response} from "express"   
import * as bcrypt from "bcrypt"
import axios from 'axios'
import * as jwt from 'jsonwebtoken' 
import * as dotenv from 'dotenv'
import { userInfo } from "os"
dotenv.config() //use the jwt secet key 


export const post = async (req:Request, res:Response): Promise<void> => {   
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    //http user client will get url with the user email attached and send back the 
    //encoded password from the database.

    const encodedPass =  await axios.get(`http://localhost:8070/api/user?Email=${userEmail}`);
    const userPasswordJson = encodedPass.data;
    const  { UserPassword : userPasswordEncoded }  =  userPasswordJson[0];//getting the first element from the encodedPass.data array.
    try{
        //compearing the user password with the encripted password from the sigh up.
        if(await bcrypt.compare(userPassword, userPasswordEncoded)){ //if the user pass and the encoded passwort that in the DB are match => true
            const user = {name: userEmail};
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.send({accessToken : accessToken});//sent the token as the result.
        }
        else{
            res.send("Not Alowed");
        }
    }catch {
        res.status(500).send("Internal Server Error");
    }
};

export const get = async (req:Request, res:Response): Promise<void> => {
    
}
