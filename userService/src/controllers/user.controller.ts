import {Request, Response} from "express"   

import * as servsices from "../../../database/src/database.mysql/database.mysql.services/services"


export const post = async (req:Request, res:Response): Promise<void> => {
    const userEmail = req.body.userEmail;
    const userFullName = req.body.userFullName;
    const userPassword = req.body.userPassword;
    res.send(req.body);
    console.log("hereeeeee");
    servsices.addNewUserToMysql(userEmail, userFullName, userPassword);
};

export const get = async (req:Request, res:Response): Promise<void> => {
    const userEmail = req.query.Email;
        await servsices.getUserPassword(`${userEmail}`).then((pass) => {
        console.log(pass);
        res.send(pass);
    });
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