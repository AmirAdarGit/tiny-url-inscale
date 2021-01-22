import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient"
//Do i nead to impore express module for Request and Response???
import { Request, Response } from "express";

export interface IAuthenticate {

    authHttPClient: IAuthServiceHttpClient;

    LogIn(req: Request, res: Response): Promise<void>
    SignUp(req: Request, res: Response): Promise<void>
}