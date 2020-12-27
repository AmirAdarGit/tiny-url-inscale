import { Request, Response } from "express";


export const create = async (req: Request, res: Response): Promise<void> => {
    res.render("url", { title: "amir" });
};

export const read = async (req: Request, res: Response): Promise<void> => {
    res.render("url", { title: "amir" });
};

export const update = async (req: Request, res: Response): Promise<void> => {
    res.render("url", { title: "amir" });
};

export const delete = async (req: Request, res: Response): Promise<void> => {
    res.render("url", { title: "amir" });
};
