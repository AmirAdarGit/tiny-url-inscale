import {Request, Response} from "express"
import { exec } from 'child_process';

export const deploy = async (req:Request, res:Response): Promise<any> => {
    const cmd = `
        cd ../..
        sh deploy-api.sh
        sh deploy-url-service.sh
    `

    await exec(cmd);

    return res.send("Running deploy script!").status(200);
};