import { Request, Response } from "express";
import axios from 'axios'
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
import { Credentials, UserMetadata} from "../../../shared/models/common"
import { Token } from "../../../shared/models/authenticate/Token"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient";
import { runInNewContext } from "vm";
import { userInfo } from "os";

// export const LogIn = async (req: Request, res: Response): Promise<Token> => {
    
//     const credentials: Credentials = {
//         Email: req.body.Email,
//         Password: req.body.userPassword
//     }
    
//     const authHttPClient: IAuthServiceHttpClient = new AuthServiceHttpClient();
//     const logInResponse = await authHttPClient.Login(credentials);

//     console.log(logInResponse);
//     return res.send(logInResponse.Value);
// };
 

export const SignUp = async (req: Request, res: Response): Promise<void> => {

    // TODO: initialize only once.
    const authHttpClient: AuthServiceHttpClient = new AuthServiceHttpClient();

    const credentials: Credentials = {
        Email: req.body.userEmail,
        Password: req.body.userPassword
    }

    const userMetadata: UserMetadata = {
        Name: req.body.userFullName,
        Newsletter: true // TODO: take newsletter from body.
    }
    try {
         await authHttpClient.SignUp(credentials, userMetadata);
         res.status(200).send();
    } catch (ex) {
        console.log(`Failed signing up, error: ${ex}`)
        if(ex.response.status == 409){
            res.status(409).send();
        }
        else{
            res.status(500).send({ ex });
    
        }
    }

}