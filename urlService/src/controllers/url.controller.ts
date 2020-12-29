import {Request, Response} from "express"   

import * as connector from "../../../database/src/database.mysql/database.mysql.connection/connection"
import * as servsices from "../../../database/src/database.mysql/datacase.mysql.services/services"



export const post = async (req:Request, res:Response): Promise<void> => {

    console.log("hereeee");

    const userEmail = req.body.userEmail;
    const userFullName = req.body.userFullName;
    const userPassword = req.body.userPassword;
    console.log(userPassword);
    res.send(req.body);
    servsices.addNewUserToMysql(userEmail, userFullName, userPassword);
};





export const get = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"get"});
};
export const update = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"put"});
};
export const remove = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"delete"});
};
