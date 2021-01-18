import { Request, Response } from "express";
import axios from 'axios'
import { AuthServiceHttpClient } from "../../../sheardModules/authServiseHttpClient/httpClient/client"
import { Credentials, Token, UserMetadata} from "../../../sheardModules/interfaces/sheard.interfaces/Isheard"
import { IAuthServiceHttpClient } from "../../../sheardModules/interfaces/authenticate.interfaces/authention";

export const post = async (req: Request, res: Response): Promise<Token> => {
    
    // const userMetadata: UserMetadata = {
    //     Name: req.body.userFullName,
    //     Newsletter: true
    // }
    // const sighUpRespomse = authHttPClient.SignUp(credentials, userMetadata);

    const credentials: Credentials = {
        Email: req.body.Email,
        Password: req.body.userPassword
    }
    
    const authHttPClient: IAuthServiceHttpClient = new AuthServiceHttpClient();
    const logInResponse = await authHttPClient.Login(credentials);

    console.log(logInResponse);
    return res.send(logInResponse.Value);
    // const token = await axios.post('http://localhost:8090/api/autentication/logIn', logInUser);
    // console.log("success");
    // res.send(sighUpUserInfoEncriptedPass.data);
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