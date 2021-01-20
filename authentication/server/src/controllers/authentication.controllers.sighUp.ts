import {Request, Response} from "express"   
import * as bcrypt from "bcrypt"
import { Credentials , UserMetadata} from "../../../../shared/models/common"
import { UserServiceHttpClient } from "../../../../shared/modules/userServiceHttpClient/client"

export const SignUp = async (req:Request, res:Response): Promise<void> => {   
    const userPassword: String = req.body.Password;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userPassword, salt);
    const userHttpClient = new UserServiceHttpClient(); // TODO: Initialize only once in the constructor

    const userMetadata: UserMetadata = {
        Name: req.body.Name,
        Newsletter: true
    }

    const credentials: Credentials = {
        Email: req.body.Email,
        Password: hashPassword
    }
    
    try {
        await userHttpClient.Create(credentials, userMetadata);
        res.status(200).send();
    } catch (ex) {
        console.log(`Failed creating user, error: ${ex.response.status}`);
        if(ex.response.status == 409){
            res.status(409).send();
        } else {
            res.status(500).send();
        }
    }
};





export const get = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"put"});
};

