import {Request, Response} from "express"   
import * as bcrypt from "bcrypt"
import axios from 'axios'
import { runInNewContext } from "vm";

export const post = async (req:Request, res:Response): Promise<void> => {   
        const userPassword = req.body.userPassword;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(userPassword, salt);

        const newUser = {
            userEmail : req.body.userEmail,
            userFullName : req.body.userFullName,
            userPassword : hashPassword //hashed password
        }
        console.log(newUser);
        
        res.json(newUser);
    //     await axios.post('http://localhost:8090/api/user', newUser).then((ans) => {
    //         console.log(ans.data);
    //         res.status(201).send("Success");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(500).send("Internal Server Error");
    //     })

    // }catch{
    //     res.status(500).send("Internal Server Error");
    // }
};

export const get = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"put"});
};

