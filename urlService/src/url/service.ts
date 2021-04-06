import { Token } from "../../../shared/models/authenticate"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient"
import { ISqsProducer } from "../../../shared/interfaces/sqsProducer"
import { Url } from "../../../shared/models/url/index"
import  * as errors  from "../../../shared/errors"
import * as mysql from "mysql"
import { OkPacket, RowDataPacket} from "mysql";
import { bool } from "aws-sdk/clients/signer"

export class UrlService {
    private database: Idatabase;
    private authHttpClient: IAuthServiceHttpClient;
    //private urlProducer: ISqsProducer; 

    constructor(database: Idatabase, authHttpClient: IAuthServiceHttpClient) {
        this.database = database;
        this.authHttpClient = authHttpClient;
        //this.urlProducer = urlProducer;
    }
    
    async create(token: Token, longUrl: string, isPrivate: boolean): Promise<string> {  
        console.log(`[Url service] - post - url: ${longUrl} token: ${token.value}, isPrivate: ${isPrivate}`);
   
        const email = await this.authHttpClient.getEmail(token);
        console.log("[Url service] - email: ",email);
        if (!email) { return new Promise((res, rej) => { rej( new errors.ValidationError("invalid Token")) }); }

        const valid: boolean = this.isLegalSite(longUrl);
        console.log("[Url service] - is valid: ",valid);

        if (!valid) { return new Promise((res, rej) => { rej( new errors.ValidationError("invalid Url")) }); }
        const insertQuery: string = `INSERT INTO tiny_url.Links (LongUrl, Email, IsPrivate) VALUES ('${longUrl}', '${email}', ${isPrivate})`;

        const isInserted = await this.database.Execute<OkPacket>(insertQuery);
        if (!isInserted) { return new Promise((res, rej) => { rej( new errors.DatabaseError("Error inserting url to the database")) }); }
        
        const selectQuery: string = `SELECT LinkId FROM tiny_url.Links WHERE LongUrl = '${longUrl}'`;
        const dbUrl: RowDataPacket = await this.database.Execute<RowDataPacket>(selectQuery);
        console.log("After selecting the shortUrl from the db: ", dbUrl);
        if (!dbUrl) { return new Promise((res, rej) => { rej( new errors.DatabaseError("Error selecting url from the database")) }); }
        const shortUrl: string = dbUrl[0];
        return shortUrl;
        // try {
        //     await this.urlProducer.SqSProduce({ email: email, shortUrl: shortUrl, longUrl: longUrl });
        //     return shortUrl;
        // } catch(ex) {
        //     console.log("Error, SQS produce faild");
        //     return shortUrl;
        // }
    }
    async read(shortUrl: string, token: Token): Promise<string> {
        
        const isValidNumner: boolean = this.validNumber(Number(shortUrl)); 
        if (!isValidNumner) { return new Promise((res, rej) => { rej( new errors.ValidationError("invalid Url"))}); }

        const query: string = `SELECT * FROM tiny_url.Links where LinkId = '${shortUrl}'`;
        const dblinkInfo: RowDataPacket  = await this.database.Execute<RowDataPacket>(query);
        console.log("link info:", dblinkInfo[0]);
        
        if (!dblinkInfo) { return new Promise((res, rej) => { rej( new errors.DatabaseError("Error inserting url to the database")) }); }
        const { IsPrivate: privacy, LongUrl: url } = dblinkInfo[0]; 
        if (!privacy) { return url; }

        if (token.value == null) { return new Promise((res, rej) => { rej (new errors.ValidationError("Private links must have token for validation"))})}
        
        const email = await this.authHttpClient.getEmail(token);
        if (!email) { return new Promise((res, rej) => { rej( new errors.ValidationError("invalid Token")) }); }
        return url;
    }

    private validNumber(shortUrl: number): boolean {
        if (shortUrl < 0 || !Number.isInteger(shortUrl)) {
            return false;
        } else {
            return true;
        }
    }

    private isLegalSite(longUrl: string): boolean {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(longUrl)
    }

}