import { Request, Response } from "express";
import axios from 'axios'


export const post = async (req: Request, res: Response): Promise<void> => {

    const newUser = {
        userEmail : req.body.userEmail,
        userFullName : req.body.userFullName,
        userPassword : req.body.userPassword
        }
    console.log(newUser);


    const sighUpUserInfoEncriptedPass = await axios.post('http://localhost:8090/api/autentication/signUp', newUser);
    const addingNewUserToDB = await axios.post('http://localhost:8070/api/user', sighUpUserInfoEncriptedPass.data)
    console.log("success");
    res.send("success to add user");
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