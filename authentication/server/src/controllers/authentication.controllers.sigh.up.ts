import {Request, Response} from "express"   
import * as bcrypt from "bcrypt"
import axios from 'axios'
import { Credentials , UserMetadata} from "../../../../sheardModules/interfaces/sheard.interfaces/Isheard"
import { UserServiceHttpClient } from "../../../../sheardModules/userServiseHttoClient/httpClient/client"

export const post = async (req:Request, res:Response): Promise<void> => {   
        
    const userPassword: String = req.body.user.credentials.Password;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userPassword, salt);

    const userMetadata: UserMetadata = {
        Name: req.body.userFullName,
        Newsletter: true
    }


    const credentials: Credentials = {
        Email: req.body.Email,
        Password: hashPassword
    }
    const userHttpClient = new UserServiceHttpClient();
    const response = await userHttpClient.addUserToDB(credentials, userMetadata);
    // const response = await axios.post('http://localhost:8090/api/user', newUser)
    res.status(201).send(response);

};

export const get = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"put"});
};

