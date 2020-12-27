import { Request, Response } from "express";
const os = require('os');


export const read = async (req: Request, res: Response): Promise<void> => {
    res.send({ username: os.userInfo().username, 
               method: "get"})
};

export const create = async (req: Request, res: Response): Promise<any> => {
    
    try {
       return res.json(({ username: gerUserName(),
            method: "post"})).send(200)
    } catch (error) {
        console.log("here111",error);
       return res.sendStatus(500)
    }

};

function gerUserName(){
    throw new Error("here error");
    return os.userInfo().username;
}

export const update = async (req: Request, res: Response): Promise<void> => {
    res.send({ username: os.userInfo().username, 
        method: "put"})};

export const remove = async (req: Request, res: Response): Promise<void> => {
    res.send({ username: os.userInfo().username, 
        method: "delete"})    
};
