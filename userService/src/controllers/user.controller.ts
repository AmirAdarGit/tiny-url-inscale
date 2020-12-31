import {Request, Response} from "express"   

import * as servsices from "../../../database/src/database.mysql/datacase.mysql.services/services"


export const post = async (req:Request, res:Response): Promise<void> => {
    const userEmail = req.body.userEmail;
    const userFullName = req.body.userFullName;
    const userPassword = req.body.userPassword;
    res.send(req.body);
    servsices.addNewUserToMysql(userEmail, userFullName, userPassword);
};

export const get = async (req:Request, res:Response): Promise<void> => {
    const userEmail = req.query.Email;
    console.log(userEmail);
    servsices.getUserInfo(`${userEmail}`);
    res.send("Getting the user informations...");
};
export const update = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"put"});
};
export const remove = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"delete"});
};
