import {Request, Response} from "express"   
import { parsePostQueryToString, parseGetQueryToString } from "../databaseUserQuery/queries"
import * as servsices from "../../../shared/modules/database/src/database.mysql/database.mysql.services/services"


export const post = async (req:Request, res:Response): Promise<void> => {
    
    const userEmail: String = req.body.Email;
    const userPassword: String = req.body.Password;
    const userFullName: String = req.body.Name;

    const postQuery = parsePostQueryToString(userEmail, userFullName, userPassword);
    try {
        const response = await servsices.addNewUserToMysql(postQuery);
        res.status(200).send();
        return;        
        
    } catch (ex) {
        res.status(500).send();
    }    
};




export const get = async (req:Request, res:Response): Promise<void> => {
    const userEmail = req.query.Email;
    const encriptedPass = await servsices.getUserPassword(`${userEmail}`); 
        res.send(encriptedPass);
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