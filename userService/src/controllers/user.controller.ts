import {request, Request, Response} from "express"   
import { parsePostQueryToString, parseGetQueryToString } from "../databaseUserQuery/queries"
import * as servsices from "../../../shared/modules/database/src/database.mysql/database.mysql.services/services"


export const Create = async (req:Request, res:Response): Promise<void> => {
    
    const userEmail: String = req.body.Email;
    const userPassword: String = req.body.Password;
    const userFullName: String = req.body.Name;

    const postQuery: string = parsePostQueryToString(userEmail, userFullName, userPassword);
    try {
        await servsices.addNewUserToMysql(postQuery);
        res.status(200).send();        
    } catch (ex) {
        if (ex.code === 'ER_DUP_ENTRY') {//exeptions from the query response
            res.status(409).send();
        }
        else res.status(500).send(ex);
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