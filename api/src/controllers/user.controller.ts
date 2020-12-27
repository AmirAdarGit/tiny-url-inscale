import { Request, Response } from "express";


export const create = async (req: Request, res: Response): Promise<void> => {
    res.render("user", { title: "amir" });
};

export const read = async (req: Request, res: Response): Promise<void> => {
    res.render("user", { title: "amir" });
};

export const update = async (req: Request, res: Response): Promise<void> => {
    res.render("user", { title: "amir" });
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    res.render("user", { title: "amir" });
};