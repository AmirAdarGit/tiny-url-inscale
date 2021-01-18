import { Request, Response } from "express";
import axios from 'axios'



export const post = async (req: Request, res: Response): Promise<void> => {
    const logInUser = {
        userEmail : req.body.userEmail,
        userPassword : req.body.userPassword
        }

    const sighUpUserInfoEncriptedPass = await axios.post('http://localhost:8090/api/autentication/logIn', logInUser);
    console.log("success");
    res.send(sighUpUserInfoEncriptedPass.data);
};
 
// export const get = async (req: Request, res: Response): Promise<any> => {
//     res.send({user:"amiraaaaaa",
//     method:"delete"});
//     console.log("get method")
// };

// export const update = async (req: Request, res: Response): Promise<void> => {
//     res.send({user:"amiraaaaaa",
//     method:"delete"});
// };

// export const remove = async (req: Request, res: Response): Promise<void> => {
//     res.send({user:"amiraaaaaa",
//     method:"delete"});
// };