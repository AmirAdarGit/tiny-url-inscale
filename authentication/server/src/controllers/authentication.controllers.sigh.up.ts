import {Request, Response} from "express"   
import * as bcrypt from "bcrypt"
import { Credentials , UserMetadata} from "../../../../shared/models/common"
import { UserServiceHttpClient } from "../../../../shared/modules/userServiceHttpClient/client"
import { runInNewContext } from "vm";

export const post = async (req:Request, res:Response): Promise<void> => {   
        
    console.log(req.body);
    const userPassword: String = req.body.Password;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userPassword, salt);
    const userHttpClient = new UserServiceHttpClient();

    const userMetadata: UserMetadata = {
        Name: req.body.Name,
        Newsletter: true
    }

    const credentials: Credentials = {
        Email: req.body.Email,
        Password: hashPassword
    }

    try {
        const response = await userHttpClient.Create(credentials, userMetadata);
        res.status(200).send(response);
    } catch (ex) {
        res.status(400).send();
    }
};





export const get = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"put"});
};

