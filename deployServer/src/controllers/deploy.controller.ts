import {Request, Response} from "express"
import { exec } from 'child_process';

export const deploy = async (req:Request, res:Response): Promise<any> => {
    const cmd = `
        sudo sh deploy.sh
    ` 

    console.log("running deploy script");

    try {
        await exec(cmd, (err, stdout, stderr) => {
            console.log(`stdout: ${JSON.stringify(stdout)}`);
            console.log(`stderr: ${JSON.stringify(stderr)}`);
        });
        return res.send("Running deploy script!").status(200);
    } catch (ex) {
        return new Promise ((_,reject) => {
            reject(ex);
        })
    }
};