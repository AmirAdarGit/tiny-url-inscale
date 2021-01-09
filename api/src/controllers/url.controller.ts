import { Request, Response } from "express";



export const post = async (req: Request, res: Response): Promise<void> => {
    res.send({user:"amiraaaaaa",
    method:"delete"});
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