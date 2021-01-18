import { Request, Response } from "express";
import axios from 'axios'
import { AuthServiceHttpClient } from "../../../sheardModules/authServiseHttpClient/httpClient/client"
import { Credentials, Token, UserMetadata} from "../../../sheardModules/interfaces/sheard.interfaces/Isheard"


export const post = async (req: Request, res: Response): Promise<void> => {

    const userMetadata: UserMetadata = {
        Name: req.body.userFullName,
        Newsletter: true
    }
    const credentials: Credentials = {
        Email: req.body.Email,
        Password: req.body.userPassword
    }
    const authHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient();

    const sighUpRespomse = authHttpClient.SignUp(credentials, userMetadata);
    res.status(201);

    const response = await axios.post('http://localhost:8090/api/autentication/signUp', newUser);
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