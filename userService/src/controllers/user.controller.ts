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
    console.log(userEmail); // console the user email
    servsices.getUserInfo(`${userEmail}`);
    res.send("Getting the " + userEmail + " user informations...");
};


export const remove = async (req:Request, res:Response): Promise<void> => {
    const userEmail = req.query.Email;
    console.log(userEmail); // console the undefined
    servsices.removeUesrFromUsersTable(`${userEmail}`);
    res.send("the user " + userEmail + " has been removed");
};



export const update = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"put"});
};