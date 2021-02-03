import { Request, Response} from "express"   
import { parsePostQueryToString, parseGetQueryToString } from "../databaseUserQuery/queries"
import * as servsices from "../../../shared/modules/database/src/database.mysql/database.mysql.services/services"
import { User } from "../../../shared/models/user/index"

export const Create = async (req:Request, res:Response): Promise<void> => {
    
    const userEmail: string = req.body.Email;
    const userPassword: string = req.body.Password;
    const userFullName: string = req.body.Name;

    const postQuery: string = parsePostQueryToString(userEmail, userFullName, userPassword); //
    try {
        await servsices.addNewUserToMysql(postQuery);//send the query to mysql db 
        res.status(200).send();        
    } catch (ex) {
        if (ex.code === 'ER_DUP_ENTRY') {//exeptions from the query response
            res.status(409).send("Error, user email is already exist, change User Email.");
        }
        else res.status(500).send(ex);
    }    
};


export const Get = async (req:Request, res:Response): Promise<void> => {

    const userEmail: string = String(req.query.email);// param instend of query because get does not have body, but params.
    const getUserPassQuery: string = parseGetQueryToString(userEmail);
    try{
        const userPassword = await servsices.GetUserPassword(getUserPassQuery); // recive the encoded pass from the db
        if(userPassword == "not_Such_User_On_DB"){
            res.status(404).send("User email does not found");
        }
        else{
            const user: User = { // generate the response user info
                Email: userEmail,
                Password: userPassword
            }
            res.status(200).send(user);
        }
    } catch (ex){
        return new Promise((_, reject) => {
            reject(ex)
        })
    }
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