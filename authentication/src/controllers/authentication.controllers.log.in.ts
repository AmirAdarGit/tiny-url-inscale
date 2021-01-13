import {Request, Response} from "express"   
import * as bcrypt from "bcrypt"
import axios from 'axios'

export const post = async (req:Request, res:Response): Promise<void> => {   
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    console.log(userEmail);
    await axios.get(`http://localhost:4000/api/user?Email=${userEmail}`)
        .then( async (encodedPass) => { //encodedPass is an promise obj
            const userPasswordJson = encodedPass.data;
            console.log(userPasswordJson);
            const  { UserPassword : userPasswordEncoded }  =  userPasswordJson[0] ;
            //const nuserPass = userPass + 'd';
            console.log(userPasswordEncoded);
            console.log(userPassword);
            try{
                if(await bcrypt.compare(userPassword, userPasswordEncoded)){ //if the user pass and the encoded passwort that in the DB are match => true
                    console.log("welcom to the app..")
                    res.send("success");
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
