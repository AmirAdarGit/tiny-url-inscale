import * as shortId from "shortid";
import * as validUrl from "valid-url";
import config from "../config/baseUrl";
import {Request, Response} from "express"   
import { convertTypeAcquisitionFromJson } from "typescript";

// @route     POST /api/url/shorten
// @desc      Create short URL

export const generateShortUrl = async (req:Request, res:Response): Promise<any> => {


    const baseUrl = config.host;
    console.log(baseUrl);
 
    const urlCode = shortId.generate();
    const shortUrl = baseUrl + "/" + urlCode;
    console.log(shortUrl);
    res.send(shortUrl);
}
