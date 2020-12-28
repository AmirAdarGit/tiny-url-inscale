import {Request, Response} from "express"

export const create = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amir",
            method:"post"});
};

export const read = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amir",
    method:"get"});
};
export const update = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amir",
    method:"put"});
};
export const remove = async (req:Request, res:Response): Promise<void> => {
    res.send({user:"amir",
    method:"delete"});
};
