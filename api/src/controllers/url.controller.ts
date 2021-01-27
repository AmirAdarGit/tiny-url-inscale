import axios from "axios";
import { Request, Response } from "express";



export const post = async (req: Request, res: Response): Promise<void> => {
    const linkInfo = {
        newLink : req.body.LongURL,
        email : req.body.Email
    }
    const heder = req.headers;
    const userJwtAndnewUrl = {
        header: req.headers,
        body: req.body
    }
    try{
    const cheakJwt = await axios.post('http://localhost:8090/api/authentication/newLink', userJwtAndnewUrl);
    console.log(cheakJwt.data);
    console.log(linkInfo);
    const addNewUrl = await axios.post('http://localhost:8070/api/url', linkInfo);
    console.log("hahaha");
    }
    catch{res.status(403).send("Forbidden");}



};
 
export const get = async (req: Request, res: Response): Promise<any> => {
    res.send({user:"amiraaaaaa",
    method:"delete"});
    console.log("get method")
};

export const update = async (req: Request, res: Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"delete"});
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"delete"});
};