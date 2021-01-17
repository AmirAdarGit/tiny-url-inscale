import {Request, Response} from "express"   
import * as bcrypt from "bcrypt"
import axios from 'axios'
import * as jwt from 'jsonwebtoken' 
import * as dotenv from 'dotenv'
dotenv.config() //use the jwt secet key 


export const post = async (req:Request, res:Response): Promise<void> => {   
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    console.log(userEmail);
    const encodedPass =   await axios.get(`http://localhost:8090/api/user?Email=${userEmail}`)
        .then( async (encodedPass) => { //encodedPass is an promise obj
            const userPasswordJson = encodedPass.data;
            const  { UserPassword : userPasswordEncoded }  =  userPasswordJson[0] ;
            try{
                if(await bcrypt.compare(userPassword, userPasswordEncoded)){ //if the user pass and the encoded passwort that in the DB are match => true
                    console.log("welcom to the app..")
                    const user = {name: userEmail};
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                    res.send({accessToken : accessToken});
                }
                else{
                    res.send("Not Alowed");
                }
            }catch {
                res.status(500).send("Internal Server Error");
            }
        }).catch((err) => {   
            res.status(500).send("Internal Server Error");
    });
};

export const get = async (req:Request, res:Response): Promise<void> => {
    
}
